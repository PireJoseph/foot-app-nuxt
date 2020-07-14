<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{ title }}
        </h1>
        <h2 v-if="subTitle" class="subtitle">
          {{ subTitle }}
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>
