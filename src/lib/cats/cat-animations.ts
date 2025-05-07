import FurColor from "../../enum/fur-color.enum";

const CAT_ANIMATIONS: { [key: string]: any } = {};
CAT_ANIMATIONS[
  String(FurColor.Tuxedo)
] = require("../../../assets/cats/tuxedo.json");
CAT_ANIMATIONS[
  String(FurColor.BrownTabby)
] = require("../../../assets/cats/brown_tabby.json");
CAT_ANIMATIONS[
  String(FurColor.SolidBlack)
] = require("../../../assets/cats/solid_black.json");
CAT_ANIMATIONS[
  String(FurColor.SolidWhite)
] = require("../../../assets/cats/solid_white.json");
CAT_ANIMATIONS[
  String(FurColor.Calico)
] = require("../../../assets/cats/calico.json");
CAT_ANIMATIONS[
  String(FurColor.BlackWhiteTabby)
] = require("../../../assets/cats/black_white_tabby.json");

export default CAT_ANIMATIONS;
