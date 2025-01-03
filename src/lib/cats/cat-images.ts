import FurColor from "../../enum/fur-color.enum";

const CAT_IMAGES: { [key: string]: any } = {};
CAT_IMAGES[
  String(FurColor.Tuxedo)
] = require("../../../assets/img/cats/tuxedo.png");
CAT_IMAGES[
  String(FurColor.BrownTabby)
] = require("../../../assets/img/cats/brown_tabby.png");
CAT_IMAGES[
  String(FurColor.SolidBlack)
] = require("../../../assets/img/cats/solid_black.png");
CAT_IMAGES[
  String(FurColor.SolidWhite)
] = require("../../../assets/img/cats/solid_white.png");
CAT_IMAGES[
  String(FurColor.Calico)
] = require("../../../assets/img/cats/calico.png");
CAT_IMAGES[
  String(FurColor.BlackWhiteTabby)
] = require("../../../assets/img/cats/black_white_tabby.png");

export default CAT_IMAGES;
