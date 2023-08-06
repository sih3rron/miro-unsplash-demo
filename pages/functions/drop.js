//create drop fn
const drop = async (e) => {
  const { x, y, target } = e;
  if (target instanceof HTMLImageElement) {
    const image = await miro.board.createImage({
      x,
      y,
      url: target.src,
    });
  }
};

//Register Handler??
window.miro.board.ui.on("drop", drop);
