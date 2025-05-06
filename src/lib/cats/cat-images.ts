import FurColor from "../../enum/fur-color.enum";

const CAT_IMAGES: { [key: string]: any } = {};
CAT_IMAGES[
  String(FurColor.Tuxedo)
] = require("../../../assets/cats/tuxedo.png");
CAT_IMAGES[
  String(FurColor.BrownTabby)
] = require("../../../assets/cats/brown_tabby.png");
CAT_IMAGES[
  String(FurColor.SolidBlack)
] = require("../../../assets/cats/solid_black.png");
CAT_IMAGES[
  String(FurColor.SolidWhite)
] = require("../../../assets/cats/solid_white.png");
CAT_IMAGES[
  String(FurColor.Calico)
] = require("../../../assets/cats/calico.png");
CAT_IMAGES[
  String(FurColor.BlackWhiteTabby)
] = require("../../../assets/cats/black_white_tabby.png");

export default CAT_IMAGES;
