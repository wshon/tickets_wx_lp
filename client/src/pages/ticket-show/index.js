/**
 * muumlover@2019-05-27
 * 票券详情页面
 * 1、显示票券二维码
 * 2、显示票券其他信息
 * 3、点击二维码放大
 * 4、TODO 显示准确的票券信息
 */
import Taro from "@tarojs/taro"
import {Canvas, View} from "@tarojs/components"
import drawQrcode from "weapp-qrcode";
import "./index.scss"
import {ticketIcon} from "../../config";

const deviceWidth = 750;
const qrCodeSize = 400;
const qrImageSize = 40;
const qrCodeFullSize = 666;
const qrImageFullSize = 66;

// const ticketIcon = {
//   "badminton": "../../img/ticket/badminton.png",
//   "basketball": "../../img/ticket/basketball.png",
//   "football": "../../img/ticket/football.png",
//   "swim": "../../img/ticket/swim.png",
//   "yoga": "../../img/ticket/yoga.png",
// };

export default class Index extends Taro.Component {

  config = {
    navigationBarBackgroundColor: "#383c42",
    navigationBarTextStyle: "white",
    navigationBarTitleText: "查看券"
  };

  constructor() {
    super(...arguments);
    this.state = {
      qrShow: false
    }
  }

  componentDidMount() {
    const {id} = this.$router.params;
    // this.setState({ value: id })
    Taro.getSystemInfo({
      success: res => {
        // 设置屏幕比例
        const {screenWidth} = res;
        const scale = screenWidth / (deviceWidth / 2);
        this.showQrCode(id, scale);
      }
    }).then(res => console.debug(res));

  }

  /**
   * 生成二维码，一个默认显示的二维码，一个放大后的二维码
   * @param value 二维码的内容
   * @param scale 屏幕缩放系数，默认为1（不推荐）
   */
  showQrCode = (value, scale = 1) => {
    const {id, type, date} = this.$router.params;
    const qrScaleSize = (qrCodeSize / 2) * scale;
    const qrScaleFullSize = (qrCodeFullSize / 2) * scale;
    console.log(type);
    drawQrcode({
      _this: this.$scope,
      canvasId: "qrCode",
      width: qrScaleSize,
      height: qrScaleSize,
      text: value,
      image: {
        imageResource: ticketIcon[type],
        dx: (qrScaleSize - qrImageSize) / 2,
        dy: (qrScaleSize - qrImageSize) / 2,
        dWidth: qrImageSize,
        dHeight: qrImageSize,
      }
    });
    drawQrcode({
      _this: this.$scope,
      canvasId: "qrCodeFull",
      width: qrScaleFullSize,
      height: qrScaleFullSize,
      text: value,
      image: {
        imageResource: ticketIcon[type],
        dx: (qrScaleFullSize - qrImageFullSize) / 2,
        dy: (qrScaleFullSize - qrImageFullSize) / 2,
        dWidth: qrImageFullSize,
        dHeight: qrImageFullSize,
      }
    });
  };

  /**
   * 二维码点击事件，点击后放大显示二维码
   */
  onQrCodeClick = () => {
    const {qrShow} = this.state;
    console.debug(`QR FullScreen ${!qrShow}`);
    if (!qrShow) {//全屏
      Taro.setNavigationBarColor({
        frontColor: "#000000",
        backgroundColor: "#ffffff"
      }).then()
    } else {
      Taro.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#383c42"
      }).then()
    }
    this.setState({qrShow: !qrShow})
  };

  render() {
    const {id, type, date} = this.$router.params;
    const {qrShow} = this.state;
    // noinspection JSXNamespaceValidation
    return (
      <View class="bg">
        <View class="qrCodeFull" hidden={!qrShow} onClick={this.onQrCodeClick.bind(this)}>
          <Canvas className="code" canvasId="qrCodeFull"/>
        </View>
        <View class="list" hidden={qrShow}>
          <View class="qrCode item" onClick={this.onQrCodeClick.bind(this)}>
            <Canvas className="code" canvasId="qrCode"/>
          </View>
          <View class="round left"/>
          <View class="round right"/>
          <View class="intro">
            <View class="item">说明：</View>
            <View>1. 可使用日期为{date}。</View> {/*TODO 根据数据显示实际日期*/}
            <View>2. 仅供本人使用不可转借他人。</View>
            <View>3. 最终解释权归发券方所有。</View>
          </View>
        </View>
      </View>
    )
  }
}
