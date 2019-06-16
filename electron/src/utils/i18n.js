import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      status: {
        header: "Status",
        ready: "ready",
        startLearning: "Start Learning",
        stopLearning: "Stop Learning",
        feeding: "Feeding for {{name}}. Count: {{count}}",
        doneTraining: "Done Training.",
        loss: "Now Training. Loss - {{loss}}",
        detected: "Detected {{label}}",
        startTraining: "Start Training",
        undetectable: "undetectable"
      },
      label: {
        numOfLabels: "Number of Labels",
        default: "Label"
      }
    }
  },
  ja: {
    translation: {
      status: {
        header: "ステータス",
        ready: "セットアップ完了",
        startLearning: "学習開始",
        stopLearning: "学習終了",
        feeding: "{{count}}枚目の{{name}}を学習中",
        doneTraining: "訓練完了",
        loss: "訓練中。Loss - {{loss}}",
        detected: "分類結果 {{label}}",
        startTraining: "訓練、分類開始。",
        undetectable: "分類不能"
      },
      label: {
        numOfLabels: "ラベル数",
        default: "ラベル"
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources: resources,
  fallbackLng: "en",
  lng: "ja",
  debug: true,

  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  }
});

export default i18n;
