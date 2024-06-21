<template>
    <div @click="openIframe">
        点击打开 pdf iframe
        <a :href="pdfUrl">点击跳转</a>
        <!-- <iframe v-if="isShowIframe" :src="pdfUrl">
        </iframe> -->
        <!-- <div v-if="isShowIframe" ref="pdfViewer" style="width: 100%; height: 500px; background-color: blue;"></div> -->
    </div>
</template>

<script setup lang="ts">

import { ref, nextTick } from 'vue';

import * as pdfjsLib from 'pdfjs-dist';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs';
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const pdfUrl = 'https://wkbjcloudbos.bdimg.com/v1/wenku-ai-flower/doc/9bc9df55b90d4a7302768e9951e79b8968026899/preview/9bc9df55b90d4a7302768e9951e79b8968026899.pdf?responseExpires=Mon%2C%2005%20Aug%202024%2010%3A34%3A05%20%2B0800&authorization=bce-auth-v1%2F46dc8cc346744dad800651823a96d9cd%2F2024-06-21T02%3A34%3A05Z%2F86400%2Fhost%2F966a0ab3d1ec8679e03d5cb8ff63b52e5f0b91da92144473843ec9a059885a57&responseContentType=application%2Fpdf&responseCacheControl=max-age%3D3888000&token=eyJ0eXAiOiJKSVQiLCJ2ZXIiOiIxLjAiLCJhbGciOiJIUzI1NiIsImV4cCI6MTcxOTAyMzY0NSwidXJpIjp0cnVlLCJwYXJhbXMiOlsicmVzcG9uc2VDb250ZW50VHlwZSIsInJlc3BvbnNlQ2FjaGVDb250cm9sIiwicmVzcG9uc2VFeHBpcmVzIl19.qcbUUiNPf2mXC3pUDZ1hbpNERUoLpg0c34rapUg%2BjUg%3D.1719023645';
const pdfUrl2 = 'https://wkbjcloudbos.bdimg.com/v1/wenku-ai-flower/doc/e7699d1f950590c69ec3d5bbfd0a79563c1ed4b6/preview/e7699d1f950590c69ec3d5bbfd0a79563c1ed4b6.pdf?responseContentType=application%2Fpdf&responseCacheControl=max-age%3D3888000&responseExpires=Sun%2C%2004%20Aug%202024%2019%3A37%3A33%20%2B0800&authorization=bce-auth-v1%2F46dc8cc346744dad800651823a96d9cd%2F2024-06-20T11%3A37%3A33Z%2F86400%2Fhost%2Fc6ae9f52788239b52bd2c4cab857891b10d66986d928cdb0836c377693adee61&token=eyJ0eXAiOiJKSVQiLCJ2ZXIiOiIxLjAiLCJhbGciOiJIUzI1NiIsImV4cCI6MTcxODk2OTg1MywidXJpIjp0cnVlLCJwYXJhbXMiOlsicmVzcG9uc2VDb250ZW50VHlwZSIsInJlc3BvbnNlQ2FjaGVDb250cm9sIiwicmVzcG9uc2VFeHBpcmVzIl19.TVID%2FujN2ypsxdbD3MvGtVOjSephfl5aWxgrkkkEP5g%3D.1718969853';

const isShowIframe = ref(false);
const pdfViewer = ref(null);

const openIframe = async () => {
    isShowIframe.value = true;
    // await nextTick();
    // loadPdf();
};

// const loadPdf = async () => {
//     const url = 'https://wkbjcloudbos.bdimg.com/v1/wenku-ai-flower/doc/540160d2f142336c1eb91a37f111f18583d00c9b/preview/540160d2f142336c1eb91a37f111f18583d00c9b.pdf?responseContentType=application%2Fpdf&responseCacheControl=max-age%3D3888000&responseExpires=Sat%2C%2003%20Aug%202024%2016%3A37%3A38%20%2B0800&authorization=bce-auth-v1%2F46dc8cc346744dad800651823a96d9cd%2F2024-06-19T08%3A37%3A38Z%2F86400%2Fhost%2F26b92f21e88a86f69b6139f792e79aff0a3bc132a0b8e31501b951aba6a354ce&token=eyJ0eXAiOiJKSVQiLCJ2ZXIiOiIxLjAiLCJhbGciOiJIUzI1NiIsImV4cCI6MTcxODg3MjY1OCwidXJpIjp0cnVlLCJwYXJhbXMiOlsicmVzcG9uc2VDb250ZW50VHlwZSIsInJlc3BvbnNlQ2FjaGVDb250cm9sIiwicmVzcG9uc2VFeHBpcmVzIl19.iSe6JTkTUfvyn%2BWqAgNsokksoizxlbSdY7GyGSC7fE8%3D.1718872658#navpanes=0';
//     const loadingTask = pdfjsLib.getDocument(url);
//     const pdf = await loadingTask.promise;
//     const page = await pdf.getPage(1);
//     const scale = 1.5;
//     const viewport = page.getViewport({ scale });

//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;

//     const renderContext = {
//         canvasContext: context,
//         viewport: viewport,
//     };
//     await page.render(renderContext).promise;

//     if (pdfViewer.value) {
//         pdfViewer.value.appendChild(canvas);
//     }
// };

</script>

<style scoped lang="scss"></style>