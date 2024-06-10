import Typography from "../ui/typography";

const Footer = () => {
  return (
    <div className="py-8 footer text-center bg-muted">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Typography element="p" as={"smallText"}>
            © {new Date().getFullYear()} TTS. All rights reserved
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Footer;
