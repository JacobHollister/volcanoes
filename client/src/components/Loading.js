import { motion } from "framer-motion"

export default function Loading() {
    return (
        <div key="loading" className="mx-auto mt-10 w-64 h-64 border-2 flex justify-center items-center rounded-lg overflow-hidden bg-slate-50 border-blue-300 shadow-xl dark:bg-slate-700 dark:text-white">
        {"loading...".split("").map((letter, ind) => {
            return <motion.h3
                        key={ind} 
                        className="inline font-eczar text-xl font-semibold mx-1/2"
                        animate={{x: [300, 0, 0, -300]}}
                        transition={{ delay: .3 * ind, duration: 5, times: [0, .2, .8, 1], repeat: Infinity, repeatDelay: 2}}
                        >
                            {letter}
                    </motion.h3>
        })}
    </div>
    )
}