import React, {useState, useEffect} from 'react';
import {Button, Flex} from "@radix-ui/themes";
import {Cross1Icon, SquareIcon, DividerHorizontalIcon, TwitterLogoIcon} from "@radix-ui/react-icons";

const TitleBar = () => {
  const [isMaximized, setMaximized] = useState(false);

  useEffect(() => {
    window.electron.on("window-maximized", () => setMaximized(true));
    window.electron.on("window-restored", () => setMaximized(false));
    return () => {
      window.electron.removeAllListeners("window-restored");
      window.electron.removeAllListeners("window-maximized");
    }
  }, []);

  const close = () => window.electron.closeWindow();
  const minimize = () => window.electron.minimizeWindow();
  const maximize = () => window.electron.maximizeWindow();
  const restore = () => window.electron.restoreWindow();

  return (
    <Flex direction="row" align={"center"} justify={"between"} className={"titlebar"}>
      <TwitterLogoIcon></TwitterLogoIcon>
      <Flex direction="row" align={"center"} gap={"4"} className={"titlebar-button"}>
        <Button variant="ghost" radius={"none"} color="gray" onClick={minimize}><DividerHorizontalIcon/></Button>
        {isMaximized ? (
          <Button variant="ghost" radius={"none"} color="gray" onClick={restore}>
            <svg aria-hidden="true" version="1.1" width="15" height="15" viewBox="-3 -3 15 15">
              <path
                d="m 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z"></path>
            </svg>
          </Button>
        ) : (
          <Button variant="ghost" radius={"none"} color="gray" onClick={maximize}>
            <SquareIcon/>
          </Button>
        )}
        <Button variant="ghost" radius={"none"} color="gray" onClick={close}><Cross1Icon/></Button>
      </Flex>
    </Flex>
  )
};

export default TitleBar;