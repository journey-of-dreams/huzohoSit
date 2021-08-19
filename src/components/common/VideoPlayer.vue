<template>
  <div
    :visible="isShowModal"
    :title="title"
    :bodyStyle="{ padding: '0px 0px 55px 0px' }"
    :footer="null"
    @cancel="hideVideoPlayer"
  >
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
      v-if="isShowModal"
    >
    </video-player>
  </div>
</template>
<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
export default {
  name: "videoPlay",
  props: {
    //开放出显示属性
    visible: {
      type: Boolean,
      default: false,
    },
    //开放出标题属性
    title: {
      type: String,
      default: "视频预览",
    },
  },
  computed: {
    //使用计算属性动态控制视频的显示与隐藏
    isShowModal() {
      return this.visible;
    },
  },
  data() {
    return {
      //播放器配置
      playerOptions: {
        width: 400,
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: "",
            type: "video/mp4",
          },
        ],
        poster: "", //封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
    };
  },
  mounted() {
    this.$emit(videoParams, this.playerOptions);
  },
  methods: {
    //播放某个播放地址
    play(playUrl) {
      //播放地址装入配置中
      this.playerOptions.sources[0].src = playUrl;
    },
    //关闭播放器
    hideVideoPlayer() {
      //通知父级
      this.$emit("cancel");
    },
  },
  components: {
    //组件注册
    videoPlayer,
  },
};
</script>
<style lang="scss" scoped>
</style>