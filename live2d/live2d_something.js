const changeClothes = () => {
  let newClothesNum = Math.floor(Math.random() * 4);
  if (newClothesNum == 0) {
    loadlive2d("live2d", `./tia/model0.json`);
  } else if (newClothesNum == 1) {
    loadlive2d("live2d", `./tia/model1.json`);
  } else if (newClothesNum == 2) {
    loadlive2d("live2d", `./tia/model2.json`);
  } else {
    loadlive2d("live2d", `./tia/model2.json`);
  }
}

