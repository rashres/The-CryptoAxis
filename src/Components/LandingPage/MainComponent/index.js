import React from 'react'
import './styles.css'
import { Dashboard, Opacity } from '@mui/icons-material'
import Button from '../../Common/Button'
import iphone from "../../../Assets/iphone.png"
import gradient from "../../../Assets/gradient.png"
import { motion } from "framer-motion";
import { duration } from '@mui/material'

function MainComponent() {
  return (
    <div className="flex-info">
        <div className="left-component">
            <motion.h1 className="track-crypto-heading"
             initial={{opacity:0, x: 50 }}
             animate={{opacity:1, x: 0 }}
             transition={{duration: 0.5 }}
             >
              Track Crypto
             </motion.h1>
            <motion.h1 className="real-time-heading"
            initial={{opacity:0, x: 50 }}
            animate={{opacity:1, x: 0 }}
            transition={{duration: 0.5, delay: 0.5 }}
            >
               Real Time
            </motion.h1>
            <motion.p className="info-text"
            initial={{opacity:0, x: 50 }}
            animate={{opacity:1, x: 0 }}
            transition={{duration: 0.5, delay: 1 }}
            >
                Track real time Crypto Currency through the use of a public api. Visit the dashboard to track!
            </motion.p>
            <motion.div className="btn-flex"
            initial={{opacity:0, x: 50 }}
            animate={{opacity:1, x: 0 }}
            transition={{duration: 0.5, delay: 1.5 }}
            >
                <Button text={"Dashboard"} />
                <Button text={"Share"} outlined={true}  />
            </motion.div>
        </div>
        <div className="phone-container">
          <motion.img 
          src={iphone} 
          className="iphone"
          initial={{ y: -12}}
          animate={{ y: 12 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}
          />
          <motion.img
          src={gradient} 
          className="gradient"
          initial={{ y: -12}}
          animate={{ y: 12 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}
          />
        </div>
    </div>
  )
}

export default MainComponent
