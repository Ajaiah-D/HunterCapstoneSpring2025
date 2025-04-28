import React from 'react'
import { animate, motion } from 'framer-motion';

type Props = {
    children: React.ReactNode;
    repeat?: boolean;
    [key: string]: any;
    // Add any other props you want to pass to the motion.div
};

const SlideInTransition = ({children, repeat, ...rest}: Props) => {

  if(repeat === true) {
    return (
      <motion.div
        {...rest}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        transition={{ duration: 0.5, delay: 0.25 }}
        whileInView={"visible"}
      >
        {children}
      </motion.div>
    );
  }
  else {
    return(
      <motion.div
        {...rest}
        initial={{ y: "100%" }}
        animate={{ y: "0%"}}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    )
  }
}

export default SlideInTransition;

