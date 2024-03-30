import { useContext } from "react";
import loading from "../../loading";
import Loader from "~~/components/shared/Loader";
import { Button } from "~~/components/ui/button";
import { MessagesContext } from "~~/context/messages";
import { cn } from "~~/utils/cn";

const GenImageButton = ({ setImgUrl, setCount, count, setLoading, loading }: any) => {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  const generateImage = async () => {
    console.log("prompt", JSON.stringify({ inverseMessages }));
    setLoading(true);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inverseMessages }),
      });

      const data = await response.json();
      console.log(data);
      if (data && data.url) {
        setImgUrl(data.url);
        setCount(1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button className={cn(count === 0 ? "bg-red-800" : "", 'min-w-[200px]')} disabled={count !== 0} onClick={generateImage}>
      {loading ? <Loader /> : "1. Convert Red Image"}
    </Button>
  );
};

export default GenImageButton;
