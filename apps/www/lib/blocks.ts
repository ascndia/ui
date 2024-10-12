"use server"

import { promises as fs } from "fs"
import { tmpdir } from "os"
import path from "path"
import { Index } from "@/__registry__"
import { Project, ScriptKind, SourceFile, SyntaxKind } from "ts-morph"
import { z } from "zod"

import { highlightCode } from "@/lib/highlight-code"
import { BlockChunk, blockSchema, registryEntrySchema } from "@/registry/schema"

const project = new Project({
  compilerOptions: {},
})

export async function getAllBlockIds() {
  const blocks = await _getAllBlocks()
  return blocks.map((block) => block.name)
}

export async function getBlock(name: string) {
  const entry = Index[name]

  const content = await _getBlockContent(name)

  const chunks = await Promise.all(
    entry.chunks?.map(async (chunk: BlockChunk) => {
      const code = await readFile(chunk.file)

      const tempFile = await createTempSourceFile(`${chunk.name}.tsx`)
      const sourceFile = project.createSourceFile(tempFile, code, {
        scriptKind: ScriptKind.TSX,
      })

      sourceFile
        .getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
        .filter((node) => {
          return node.getAttribute("x-chunk") !== undefined
        })
        ?.map((component) => {
          component
            .getAttribute("x-chunk")
            ?.asKind(SyntaxKind.JsxAttribute)
            ?.remove()
        })

      return {
        ...chunk,
        code: sourceFile.getText().replaceAll(`@/registry/`, "@/components/"),
      }
    })
  )

  return blockSchema.parse({
    highlightedCode: content.code ? await highlightCode(content.code) : "",
    ...entry,
    ...content,
    chunks,
    type: "registry:block",
  })
}

async function _getAllBlocks() {
  const index = z.record(registryEntrySchema)

  return Object.values(index).filter((block) => block.type === "registry:block")
}

async function _getBlockCode(name: string) {
  const entry = Index[name]
  if (!entry) {
    console.error(`Block ${name} not found`)
    return ""
  }
  const block = registryEntrySchema.parse(entry)

  if (!block.source) {
    return ""
  }

  return await readFile(block.source)
}

async function readFile(source: string) {
  const filepath = path.join(process.cwd(), source)
  return await fs.readFile(filepath, "utf-8")
}

async function createTempSourceFile(filename: string) {
  const dir = await fs.mkdtemp(path.join(tmpdir(), "codex-"))
  return path.join(dir, filename)
}

async function _getBlockContent(name: string) {
  const raw = await _getBlockCode(name)

  const tempFile = await createTempSourceFile(`${name}.tsx`)
  const sourceFile = project.createSourceFile(tempFile, raw, {
    scriptKind: ScriptKind.TSX,
  })

  // Extract meta.
  const iframeHeight = _extractVariable(sourceFile, "iframeHeight")
  const containerClassName = _extractVariable(sourceFile, "containerClassName")

  // Format the code.
  let code = sourceFile.getText()
  code = code.replaceAll(`@/registry/`, "@/components/")
  code = code.replaceAll("export default", "export")

  return {
    code,
    container: {
      height: iframeHeight,
      className: containerClassName,
    },
  }
}

function _extractVariable(sourceFile: SourceFile, name: string) {
  const variable = sourceFile.getVariableDeclaration(name)
  if (!variable) {
    return null
  }

  const value = variable
    .getInitializerIfKindOrThrow(SyntaxKind.StringLiteral)
    .getLiteralValue()

  variable.remove()

  return value
}
