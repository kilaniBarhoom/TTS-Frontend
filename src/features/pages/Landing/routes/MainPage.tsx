import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.16 * i,
    },
  }),
};

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-20 mt-10 mx-auto w-fit">
      <motion.div
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        custom={0}
      >
        <Typography
          element="h1"
          as={"h1"}
          className="text-center max-w-screen-lg"
        >
          Manage your work through out ticket management system
        </Typography>
      </motion.div>
      <motion.div
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        custom={1}
        className="bg-muted/50 mx-auto flex md:flex-row flex-col gap-4 justify-center md:justify-between items-center h-fit p-4 rounded-md max-w-screen-lg w-full"
      >
        <Typography element="p" as={"h5"} className="text-center capitalize">
          Get started with our ticket management system
        </Typography>
        <Button
          variant={"expandIcon"}
          Icon={ArrowRight}
          className="w-full md:w-auto"
          onClick={() => navigate("/register")}
        >
          Get Started
        </Button>
      </motion.div>
      <motion.div
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        custom={2}
        className="rounded-md border border-border"
      >
        <img src="/assets/landing/projects-table.png" alt="" />
      </motion.div>
      <div className="flex items-center justify-between w-full"></div>
    </div>
  );
};

export default MainPage;
