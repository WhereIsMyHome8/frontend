<template>
  <div>
    <b-row class="ml-2">
      <b-col cols="2">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="info"
              >검색 결과</b-button
            >
          </b-card-header>
          <b-collapse id="accordion-1">
            <b-table
              striped
              hover
              :items="aptlist"
              :fields="fields"
              :per-page="perPage"
              :current-page="curPage"
              @row-clicked="showThisApartment"
            ></b-table>
            <b-pagination
              :total-rows="aptlist.length"
              v-model="curPage"
              align="center"
              limit="10"
            ></b-pagination>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-2 variant="info">
              관심 아파트
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-2">
            <b-list-group
              v-for="(item, index) in checkInterestList"
              :key="index"
            >
              <b-list-group-item @click="clickInterest(item.aptCode)">{{
                item.aptName
              }}</b-list-group-item>
            </b-list-group>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1">
            <b-button block v-b-toggle.collapse-1 variant="info"
              >거래량 보기</b-button
            >
          </b-card-header>
        </b-card>
      </b-col>
      <b-col cols="6">
        <div id="map" class="map-container"></div>
      </b-col>
      <b-col cols="4">
        <div id="roadview" style="width: 100%; height: 300px"></div>

        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <LineShow></LineShow>
          </b-card>
        </b-collapse>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";
import { addInterest } from "@/api/interest.js";
import { getApartByCode, dealInfoFilter } from "@/api/apt.js";
import LineShow from "@/components/LineShow.vue";

export default {
  name: "HomeResult",
  data() {
    return {
      perPage: 10,
      curPage: 1,
      markers: [],
      curOverlay: [],
      currCategory: "",
      fields: [
        {
          key: "aptName",
          label: "아파트",
        },
        {
          key: "dealInfo",
          label: "거래 가격",
        },
      ],
    };
  },
  components: {
    LineShow,
  },

  computed: {
    ...mapState("aptStore", ["aptlist", "aptpositions", "aptCode"]),
    ...mapState("userStore", ["userInfo"]),
    ...mapGetters("userStore", ["checkInterestList"]),
  },
  created() {
    this.INIT_APT_LIST();
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      const appKey = process.env.VUE_APP_KAKAO_MAP_KEY;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${appKey}&libraries=services`;
      document.head.appendChild(script);

      const shareScript = document.createElement("script");
      shareScript.src =
        "https://t1.kakaocdn.net/kakao_js_sdk/2.0.1/kakao.min.js";
      shareScript.integrity =
        "sha384-eKjgHJ9+vwU/FCSUG3nV1RKFolUXLsc6nLQ2R1tD0t4YFPCvRmkcF8saIfOZNWf/";
      shareScript.crossOrigin = "anonymous";
      document.head.appendChild(shareScript);
    }
  },

  updated() {
    if (this.markers.length > 0) {
      this.markers.forEach((marker) => marker.setMap(null));
    }
    const positions = this.aptpositions.map(
      (position) => new kakao.maps.LatLng(...position)
    );
    this.addMarker(positions, this.aptlist);
  },
  methods: {
    ...mapActions("userStore", ["getInterestList"]),
    ...mapMutations("aptStore", ["INIT_APT_LIST", "SET_APT_CODE"]),

    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);
    },
    sendKakao(apt, addr) {
      if (window.Kakao && !window.Kakao.Share) {
        window.Kakao.init(process.env.VUE_APP_KAKAO_MAP_KEY);
      }
      window.Kakao.Share.createDefaultButton({
        container: `#share-${apt.aptCode}`,
        objectType: "location",
        address: `${addr}`,
        addressTitle: apt.aptName,
        content: {
          title: "Where is My Home",
          description: addr,
          imageUrl: "@/assets/share_image.png",
          link: {
            mobileWebUrl: "https://developers.kakao.com",
            webUrl: "https://developers.kakao.com",
          },
        },
        social: {
          likeCount: 888,
          commentCount: 88,
          sharedCount: 8,
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: "http://localhost:8080",
              webUrl: "http://localhost:8080",
            },
          },
        ],
      });
    },
    addMarker(positions, infos) {
      var imageSrc = require("@/assets/marker.png"),
        imageSize = new kakao.maps.Size(30, 30),
        imageOption = { offset: new kakao.maps.Point(26, 35) };

      let markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      let interestImage = new kakao.maps.MarkerImage(
        require("@/assets/marker_interest.png"),
        imageSize,
        imageOption
      );
      if (positions.length > 0) {
        this.markers = positions.map((position, index) => {
          let isInterest = false;
          this.checkInterestList.forEach((interest) => {
            if (interest.aptCode === infos[index].aptCode) isInterest = true;
          });
          return new kakao.maps.Marker({
            position,
            image: isInterest ? interestImage : markerImage,
          });
        });
      }
      this.markers.forEach((marker, index) => {
        kakao.maps.event.addListener(marker, "click", () => {
          this.showOverlay(index, infos[index]).then((ret) =>
            this.curOverlay.push(ret)
          );
        });
        marker.setMap(this.map);
      });
      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds()
      );

      this.map.setBounds(bounds);
    },
    showThisApartment(apt, index) {
      let pos = this.aptpositions[index];
      let moveLatLon = new kakao.maps.LatLng(pos[0], pos[1]);

      this.showOverlay(index, apt).then((overlay) =>
        this.curOverlay.push(overlay)
      );

      this.map.setLevel(3);
      this.map.setCenter(moveLatLon);
    },
    clickInterest(aptCode) {
      getApartByCode(
        aptCode,
        ({ data }) => {
          let positions = [];
          let infos = [];
          positions.push(new kakao.maps.LatLng(data.lat, data.lng));
          let dealInfo = dealInfoFilter(data);
          infos.push({
            aptCode: data.aptCode,
            aptName: data.aptName,
            lat: data.lat,
            lng: data.lng,
            dealInfo,
            area: data.area,
            buildYear: data.buildYear,
          });
          this.addMarker(positions, infos);
        },
        () => {}
      );
    },
    roadview(pos1, pos2) {
      //로드뷰코드시작
      let roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
      let roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      let roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
      let position1 = new kakao.maps.LatLng(pos1, pos2);
      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      roadviewClient.getNearestPanoId(position1, 50, function (panoId) {
        roadview.setPanoId(panoId, position1); //panoId와 중심좌표를 통해 로드뷰 실행
      });
    },

    async showOverlay(index, apt) {
      console.log(this.curOverlay);
      if (this.curOverlay.length > 0) this.curOverlay[0].setMap(null);
      this.curOverlay = [];
      let pos = null;
      if (apt.lat) pos = [apt.lat, apt.lng];
      else pos = this.aptpositions[index];

      let addr = await this.getAddr(pos);

      let content = document.createElement("div");
      content.className = "wrap";

      let info = document.createElement("div");
      info.className = "info";

      let title = document.createElement("div");
      title.className = "title";
      info.appendChild(title);

      let aptName = document.createElement("span");
      aptName.appendChild(document.createTextNode(apt.aptName));
      title.appendChild(aptName);

      let closeBtn = document.createElement("div");
      closeBtn.className = "close";
      closeBtn.onclick = () => {
        overlay.setMap(null);
      };
      title.appendChild(closeBtn);
      info.appendChild(title);

      let body = document.createElement("div");
      body.className = "body";

      let desc = document.createElement("div");
      desc.className = "desc";

      let address = document.createElement("div");
      let aptAddress = document.createElement("span");
      aptAddress.appendChild(document.createTextNode(addr));
      address.appendChild(aptAddress);
      desc.appendChild(address);

      let dealInfo = document.createElement("div");
      let aptDealInfo = document.createElement("span");
      aptDealInfo.appendChild(document.createTextNode(apt.dealInfo));
      dealInfo.appendChild(aptDealInfo);
      desc.appendChild(dealInfo);

      let buildYear = document.createElement("div");
      let aptBuildYear = document.createElement("span");
      aptBuildYear.appendChild(
        document.createTextNode(apt.buildYear + "년 준공")
      );
      buildYear.appendChild(aptBuildYear);
      desc.appendChild(buildYear);

      let area = document.createElement("div");
      let aptArea = document.createElement("span");
      aptArea.appendChild(document.createTextNode("면적: " + apt.area + "㎡"));
      area.appendChild(aptArea);
      desc.appendChild(area);
      body.appendChild(desc);

      let icons = document.createElement("div");
      icons.className = "icons";

      let favImg = document.createElement("div");
      favImg.className = "fav-img";
      favImg.onclick = () => {
        if (this.userInfo === null) return;
        addInterest(
          {
            userId: this.userInfo.id,
            aptCode: apt.aptCode,
          },
          () => {
            // todo: heart image change to heart-fill
            alert("등록 성공");
            this.getInterestList();
          },
          () => {
            alert("등록 실패");
          }
        );
      };
      icons.appendChild(favImg);

      let shareImg = document.createElement("div");
      shareImg.id = `share-${apt.aptCode}`;
      shareImg.className = "share-img";
      shareImg.onclick = () => {
        this.sendKakao(apt, addr);
      };
      icons.appendChild(shareImg);

      body.appendChild(icons);

      info.appendChild(body);
      content.appendChild(info);

      let position = new kakao.maps.LatLng(pos[0], pos[1]);
      let overlay = new kakao.maps.CustomOverlay({
        position,
        content,
        map: this.map,
      });
      overlay.setMap(this.map);

      //아파트 코드를 호출을 하여서 처리를 하고자 함
      // alert("전:" + this.aptCode);
      // this.aptCode = apt.aptCode;
      this.SET_APT_CODE(apt.aptCode);
      // this.$store.commit("SET_APT_CODE", apt.aptCode);
      //alert("후:" + this.aptCode);
      //로드뷰 호출
      this.roadview(pos[0], pos[1]);

      return overlay;
    },
    async getAddr(pos) {
      let geocoder = new kakao.maps.services.Geocoder();
      const addressSearch = () => {
        return new Promise((resolve, reject) => {
          geocoder.coord2RegionCode(pos[1], pos[0], (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              resolve(result[1].address_name);
            } else {
              reject(status);
            }
          });
        });
      };
      let ret = await addressSearch();
      return ret;
    },
  },
};
</script>

<style>
#map {
  width: 100%;
  min-height: 70vh;
}
.container {
  margin-bottom: 400px;
}
.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 268px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}
.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
  cursor: pointer;
}
.info .body {
  position: relative;
  display: flex;
  height: fit-content;
  flex-wrap: wrap;
}
.info .desc {
  position: relative;
  flex: 0 0 66.666667%;
  max-width: 66.666667%;
  margin: 10px 0 0 10px;
  height: 75px;
}
.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.icons {
  height: fit-content;
  flex: 0 0 16.666667%;
  max-width: 16.666667%;
  margin-top: 10px;
  margin-left: 5px;
  padding: 2px;
}
.fav-img {
  width: 30px;
  height: 30px;
  background-size: 30px;
  margin-bottom: 10px;
  background-image: url("../assets/heart.png");
}
.fav-img:hover {
  cursor: pointer;
  background-image: url("@/assets/heart_hover.png");
}
.share-img {
  width: 30px;
  height: 30px;
  background-size: 30px;
  background-image: url("https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png");
}
.share-img:hover {
  cursor: pointer;
}
</style>
