<template>
    <Header></Header>
    <div class="main">
        <img src="../static/image/int1.png" alt="" class="img1">
        <img src="../static/image/int2.png" alt="" class="img2">
        <div class="text1">
            <div class="text-title">Replace traditional programming <br> with quantum programming</div>
            <div class="text-label">Traditional programming mostly uses C++, Java and other high-level <br> languages, and using traditional programming thinking to solve <br> mathematical problems has been people's habitual thinking for many years.</div>
            <div class="text-label">Here's a different view: quantum computing can solve even some math <br> problems faster.</div>
        </div>
        <div class="text2">
            <div class="text-title">Always hold the spirit of learning <br> whether related to your work or not</div>
            <div class="text-label">We advocate the use of quantum  computing  thinking to solve <br> traditional mathematical problems.</div>
            <div class="text-label">It is not to hope that quantum programming will replace traditional<br> programming, but that everyone can learn the thinking and methods <br> of quantum programming, whether you are a relevant practitioner or <br> not.</div>
        </div>
    </div>
    <Footer></Footer>
</template>

<script setup>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'

</script>

<style lang="scss" scoped>
.main {
    height: 100%;
}

.text1 {
    position: absolute;
    top: 25%;
    right: 20%;
    .text-title {
        font-size: 32px;
        line-height: 42px;
        font-weight: bold;
        margin-bottom: 15px;
    }
    .text-label {
        color: #757373;
        font-size: 16px;
        line-height: 25px;
        margin-bottom: 10px;
    }
}
.text2 {
    position: absolute;
    bottom: -5%;
    left: 20%;
    .text-title {
        font-size: 32px;
        line-height: 42px;
        font-weight: bold;
        margin-bottom: 15px;
    }
    .text-label {
        color: #757373;
        font-size: 16px;
        line-height: 25px;
        margin-bottom: 10px;
    }
}
.img1 {
    position: absolute;
    width: 27%;
    top: 15%;
    left: 10%;
}
.img2 {
    position: absolute;
    width: 27%;
    bottom: -5%;
    right: 10%;
}
</style>