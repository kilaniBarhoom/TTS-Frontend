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
    <div className="flex flex-col items-center md:gap-20 gap-10 mt-10 lg:mt-20 mx-auto w-full">
      <motion.div
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        custom={0}
      >
        <div className="max-w-screen-2xl mx-auto text-center grid gap-5 p-5">
          <Typography element="h1" className="text-7xl">
            Manage your work through our
          </Typography>
          <Typography
            element="h1"
            className="text-primary text-8xl font-bold capitalize"
          >
            ticket management system
          </Typography>
          <Typography
            element="h1"
            className="capitalize text-3xl mt-5 max-w-screen-lg mx-auto text-muted-foreground"
          >
            Meet the new standard for modern software development. Streamline
            issues, sprints, and product roadmaps.
          </Typography>
        </div>
      </motion.div>
      <motion.div
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        custom={1}
        className="bg-muted/50 mx-auto flex md:flex-row flex-col gap-4 justify-center md:justify-between items-center h-fit p-5 rounded-md max-w-screen-sm w-full"
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
        className="relative"
      >
        <div className="absolute inset-0 bg-[#3676df] opacity-50 blur-3xl rounded-md"></div>
        <div className="mx-auto w-fit relative p-5">
          <img
            src="/assets/landing/projects-table.png"
            alt=""
            // width={1000}
            className="rounded-md"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default MainPage;
