useEffect(() => {
  console.log("Start")
  try {
    console.log("Drop")
    window.miro.board.ui.on("drop", async (e) => {
      console.log("Step1");
      const { x, y, target } = e;

      try {
        if (target instanceof HTMLImageElement) {
          const image = await miro.board.createImage({
            x,
            y,
            url: target.src,
          });
          await miro.board.viewport.zoomTo(image);
          console.log("Don't Drop me Now!");
        }
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }

  if (new URLSearchParams(window.location.search).has("panel")) return;
  window.miro.board.ui.on("icon:click", async () => {
    window.miro.board.ui.openPanel({
      url: `/?panel=1`,
    });
  });
}, []);