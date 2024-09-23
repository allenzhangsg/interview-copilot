import { useState, useEffect } from "react";
import { Button, Flex } from "@radix-ui/themes";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

// SVG icons as a constant object for better organization
const icons = {
  restore: (
    <svg aria-hidden="true" width="15" height="15" viewBox="-3 -3 15 15">
      <path d="m 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z"></path>
    </svg>
  ),
  minimize: (
    <svg aria-hidden="true" width="15" height="15" viewBox="-3 -3 15 15">
      <path d="M 0,5 10,5 10,6 0,6 Z"></path>
    </svg>
  ),
  maximize: (
    <svg aria-hidden="true" width="15" height="15" viewBox="-3 -3 15 15">
      <path d="M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z"></path>
    </svg>
  ),
  close: (
    <svg aria-hidden="true" width="15" height="15" viewBox="-3 -3 15 15">
      <path d="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z"></path>
    </svg>
  ),
};

const TitleBar = () => {
  const [isMaximized, setMaximized] = useState(false);

  useEffect(() => {
    const handleMaximized = () => setMaximized(true);
    const handleRestored = () => setMaximized(false);

    window.electron.on("window-maximized", handleMaximized);
    window.electron.on("window-restored", handleRestored);

    return () => {
      window.electron.removeListener("window-restored", handleRestored);
      window.electron.removeListener("window-maximized", handleMaximized);
    };
  }, []);

  return (
    <Flex
      direction="row"
      align={"center"}
      justify={"between"}
      className={"titlebar"}
      height="30px"
    >
      <TwitterLogoIcon></TwitterLogoIcon>
      <Flex
        direction="row"
        align={"center"}
        gap={"4"}
        className={"titlebar-button"}
      >
        <Button
          variant="ghost"
          radius={"none"}
          color="gray"
          onClick={window.electron.minimizeWindow}
          style={{ width: '25px', height: '22px' }}
        >
          {icons.minimize}
        </Button>
        <Button
          variant="ghost"
          radius={"none"}
          color="gray"
          style={{ width: '25px', height: '22px' }}
          onClick={
            isMaximized
              ? window.electron.restoreWindow
              : window.electron.maximizeWindow
          }
        >
          {isMaximized ? icons.restore : icons.maximize}
        </Button>
        <Button
          variant="ghost"
          radius={"none"}
          color="gray"
          onClick={window.electron.closeWindow}
          style={{ width: '25px', height: '22px' }}
          className="hover-red"
        >
          {icons.close}
        </Button>
      </Flex>
    </Flex>
  );
};

export default TitleBar;
