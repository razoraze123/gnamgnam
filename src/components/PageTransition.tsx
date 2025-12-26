import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

interface PageTransitionProps {
    children: ReactNode
}

const TRANSITION_DURATION_IN = 0.15
const TRANSITION_DURATION_OUT = 0.05

const pageVariants: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: TRANSITION_DURATION_IN,
            ease: 'linear'
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: TRANSITION_DURATION_OUT
        }
    }
}

export default function PageTransition({ children }: PageTransitionProps) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {children}
        </motion.div>
    )
}
