import FurColor from "../../enum/fur-color.enum";

const CAT_ANIMATIONS: { [key: string]: any } = {};
CAT_ANIMATIONS[
  String(FurColor.Tuxedo)
] = require("../../../assets/lottiefiles/tuxedo.json");
CAT_ANIMATIONS[
  String(FurColor.BrownTabby)
] = require("../../../assets/lottiefiles/solid_white.json");
CAT_ANIMATIONS[
  String(FurColor.SolidBlack)
] = require("../../../assets/lottiefiles/solid_black.json");
CAT_ANIMATIONS[
  String(FurColor.SolidWhite)
] = require("../../../assets/lottiefiles/solid_white.json");
CAT_ANIMATIONS[
  String(FurColor.Calico)
] = require("../../../assets/lottiefiles/calico.json");
CAT_ANIMATIONS[
  String(FurColor.BlackWhiteTabby)
] = require("../../../assets/lottiefiles/solid_white.json");

export default CAT_ANIMATIONS;
