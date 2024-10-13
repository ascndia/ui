"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import screen1 from "public/product-overview.jpg"
import screen4 from "public/product-vault.jpg"
import screen2 from "public/screen-2.png"
import screen3 from "public/screen-3.png"
import screen5 from "public/screen-5.png"

let interval: any

type Card = {
  id: number
  content: React.ReactNode
  name: string
}

export default function Screens() {
  return (
    <div className=" w-full relative pt-8 pb-4">
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-center pb-14">
          <h3 className="text-4xl md:text-6xl font-medium">The thin layer</h3>
          <p className="mt-4 text-[#878787]">
            Bridging the gap between your bank and your accountants software.
          </p>
        </div>

        <CardStack
          items={[
            {
              id: 1,
              name: "Overview",
              content: (
                <Image
                  quality={100}
                  alt="Dashboard - Overview"
                  src={screen1}
                  width={1031}
                  height={670}
                  priority
                  className="border border-border"
                />
              ),
            },
            {
              id: 2,
              name: "Tracker",
              content: (
                <Image
                  quality={100}
                  alt="Dashboard - Tracker"
                  src={screen2}
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
            {
              id: 3,
              name: "Inbox",
              content: (
                <Image
                  quality={100}
                  alt="Dashboard - Inbox"
                  src={screen3}
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
            {
              id: 4,
              name: "Vault",
              content: (
                <Image
                  quality={100}
                  alt="Dashboard - Vault"
                  src={screen4}
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
            {
              id: 5,
              name: "Dashboard - Transactions",
              content: (
                <Image
                  quality={100}
                  alt="Dashboard - Transactions"
                  src={screen5}
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
          ]}
        />
      </div>

      <div className="dotted-bg absolute w-[10000px] h-full top-0 -left-[5000px]" />
    </div>
  )
}

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[]
  offset?: number
  scaleFactor?: number
}) => {
  const CARD_OFFSET = 5
  const SCALE_FACTOR = scaleFactor || 0.06
  const [cards, setCards] = useState<Card[]>(items)

  useEffect(() => {
    startFlipping()
    setCards(items)
    return () => clearInterval(interval)
  }, [])

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards] // create a copy of the array
        newArray.unshift(newArray.pop()!) // move the last element to the front
        return newArray
      })
    }, 5000)
  }

  const onChangeCardByIndex = (index: any) => {
    const item = cards.at(index)
    setCards([item!, ...cards.slice(0, index), ...cards.slice(index + 1)])
  }

  const onChangeCard = (item: any) => {
    const index = cards.findIndex((card) => card.id === item.id)
    setCards([item, ...cards.slice(0, index), ...cards.slice(index + 1)])
  }

  // TODO: Get screen width
  return (
    <div
      className="relative h-[220px] md:h-[670px] w-full z-10"
      onMouseEnter={() => clearInterval(interval)}
    >
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute h-[220px] md:h-[670px] w-full items flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
              display: index > 2 ? "none" : "block",
            }}
            whileHover={{
              top: index > 0 ? index * -CARD_OFFSET - 30 : undefined,
              transition: { duration: 0.3 },
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
            onMouseEnter={() => clearInterval(interval)}
          >
            <div onClick={() => onChangeCardByIndex(index)}>{card.content}</div>
          </motion.div>
        )
      })}
    </div>
  )
}
