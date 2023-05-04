<template>
  <ion-content class="literature-section-content" :scroll-events="true">
    <div class="literature-filter-container">
      <h2 class="literature-section-title ion-padding-top">
        Literature ({{ filteredLiterature.length }})
      </h2>
      <!--      <p class="literature-section-title ion-no-margin">-->
      <!--        Page {{ paginationInfo.current_page }} /-->
      <!--        {{ paginationInfo.total_pages }}-->
      <!--      </p>-->
      <ion-button
        size="small"
        fill="clear"
        id="themes-logs-button"
        @click="onLogbookButtonClicked"
      >
        <ion-icon name="book" class="ion-margin-end"></ion-icon>
        <span> View researcher logbook </span>
      </ion-button>
    </div>

    <p v-if="loadingLiteratureData">
      <ion-spinner></ion-spinner>
      <em>Loading articles...</em>
    </p>

    <div class="literature-item-container">
      <template v-for="(literatureItem, idx) in shownLiterature" :key="idx">
        <literature-item :literatureItem="literatureItem"></literature-item>
      </template>
    </div>

    <!-- Currently disabled/unsupported: Pagination -->
    <!--    <div class="pagination-container" v-if="paginationInfo.total_pages > 1">-->
    <!--      <ion-grid>-->
    <!--        <ion-row>-->
    <!--          <ion-col>-->
    <!--            <ion-button-->
    <!--              @click="onPreviousPage"-->
    <!--              :disabled="!paginationInfo.has_previous_page"-->
    <!--              class="button-prev-page"-->
    <!--            >-->
    <!--              <ion-icon name="caret-back"></ion-icon>-->
    <!--              Previous-->
    <!--            </ion-button>-->
    <!--          </ion-col>-->

    <!--          <ion-col>-->
    <!--            <p class="current-page-text">-->
    <!--              <em-->
    <!--                >Current page: {{ currentPage }} /-->
    <!--                {{ paginationInfo.total_pages }}</em-->
    <!--              >-->
    <!--            </p>-->
    <!--          </ion-col>-->

    <!--          <ion-col>-->
    <!--            <ion-button-->
    <!--              @click="onNextPage"-->
    <!--              :disabled="!paginationInfo.has_next_page"-->
    <!--              class="button-next-page"-->
    <!--            >-->
    <!--              Next-->
    <!--              <ion-icon name="caret-forward"></ion-icon>-->
    <!--            </ion-button>-->
    <!--          </ion-col>-->
    <!--        </ion-row>-->
    <!--      </ion-grid>-->
    <!--    </div>-->
  </ion-content>
</template>

<script>
import LiteratureItem from "./LiteratureItem.vue";

import { Config } from "@/config";
import { mapActions, mapGetters } from "vuex";
import Paginator from "paginator";

export default {
  mixins: [],
  name: "LiteratureViewer",
  components: {
    LiteratureItem,
  },
  data() {
    return {
      config: Config,
      numLitItemsToShow: Config.NUM_LIT_ITEMS_PER_PAGE,
      currentPage: 1,
      paginator: new Paginator(Config.NUM_LIT_ITEMS_PER_PAGE, 5),
    };
  },
  computed: {
    ...mapGetters({
      filteredLiterature: "literature/getFilteredLiterature",
      loadingLiteratureData: "literature/getLoadingLiteratureData",
    }),
    isDraggingTimeFilter() {
      return this.$store.getters["timeFilter/isDragging"];
    },
    paginationInfo: function () {
      return this.paginator.build(
        this.filteredLiterature.length,
        this.currentPage
      );
    },
    shownLiterature: function () {
      if (!this.filteredLiterature || this.filteredLiterature.length <= 0) {
        return [];
      }

      const literatureOnCurrentPage = this.filteredLiterature.slice(
        this.paginationInfo.first_result,
        this.paginationInfo.last_result + 1
      );
      const shownLiterature = literatureOnCurrentPage;
      // const shownLiterature = this.isDraggingTimeFilter
      //   ? []
      //   : literatureOnCurrentPage;
      return shownLiterature;
    },
  },
  watch: {
    paginationInfo: {
      handler: function (newPaginationInfo, _) {
        if (this.currentPage < newPaginationInfo.first_page) {
          this.currentPage = newPaginationInfo.first_page;
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      loadLiteratureData: "literature/loadLiteratureData",
    }),
    onLogbookButtonClicked() {
      window.location.href = "/researcher-logbook";
    },
    onPreviousPage() {
      this.currentPage--;
      this.scrollToTop();
    },
    onNextPage() {
      this.currentPage++;
      this.scrollToTop();
    },
    scrollToTop() {
      setTimeout(() => {
        document
          .querySelector("ion-content.literature-section-content")
          .scrollToTop(400);
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.literature-section-title {
  margin-left: 8px;
  margin-bottom: 0;
  margin-top: 0;
}

ion-spinner {
  margin-right: 10px;
  top: 8px;
}

.literature-filter-container {
  position: sticky;
  top: 0;
  background: white;
  z-index: 9999;
}

.button-next-page {
  float: right;
}

.current-page-text {
  text-align: center;
}

#themes-logs-button {
  --background: #52c1ee;
  --color: white;
  /*font-weight: bold;*/
  position: absolute;
  right: 8px;
  top: 12px;
}
</style>
