import { motion } from "framer-motion";

type Props = {
  text: string;
};

const ZoopText = ({ text }: Props) => {
  const stagger = 0.5;
  const duration = 0.25;

  const even = (i: number) => {
    if (i / 2 == 2 || i == 2 || i == 0) {
      const isEven = true;
      console.log("Index: ", i, " & Even: ", isEven);
      return true;
    }
    return false;
  };

  return (
    <motion.div
      initial="initial"
      whileInView="zoop"
      className="relative overflow-hidden whitespace-nowrap text-4xl uppercase sm:text-7xl md:text-8xl lg:text-9xl w-fit grid m-auto"
    >
      <div>
        {text.split("").map((l: string, i: number) => {
          console.log(i);
          return (
            <motion.span
              className="inline-block"
              variants={{
                initial: {
                  opacity: 0,
                  color: even(i) ? "white" : "black",
                },
                zoop: {
                  opacity: "100%",
                  color: even(i) ? "black" : "white",
                },
              }}
              transition={{
                duration: duration,
                ease: "easeInOut",
                delay: stagger * i,
              }}
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {text.split("").map((l: string, i: number) => {
          return (
            <motion.span
              className="inline-block"
              variants={{
                initial: {
                  y: "100%",
                  color: even(i) ? "black" : "white",
                },
                zoop: {
                  y: 0,
                  color: even(i) ? "white" : "black",
                },
              }}
              transition={{
                duration: duration,
                ease: "easeInOut",
                delay: stagger * i,
              }}
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ZoopText;
