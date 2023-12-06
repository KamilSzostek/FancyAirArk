import { useState } from 'react'
import Head from 'next/head'
import Header from '@/components/Header/Header'
import Main from '../components/Main/Main'
import { motion } from 'framer-motion'

export default function Home() {
  const [pagePosition, setPagePosition] = useState(0)
  const pagePositionHandler = (pagePosition: number) => setPagePosition(pagePosition)
  return (
    <>
      <Head>
        <title>AirArk</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        animate={{background: pagePosition !== 0 ? '#1C1714' : '#fff'}}
        transition={{ type: 'ease in', duration: 1, delay: .5 }}
      >
        <Header pagePosition={pagePosition} setPagePosition={pagePositionHandler} />
        <Main pagePosition={pagePosition} setPagePosition={pagePositionHandler} />
      </motion.div>
    </>
  )
}
