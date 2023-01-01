<script lang="ts" setup>
import Social from "@/components/Social/Social.vue";
</script>
<template>
  <footer class="footer flex flex-column text-center text-white py-5">
    <div class="mb-2">
      <p class="social__text">FOLLOW STAR WARS:</p>
      <Social />
    </div>
    <div class="mb-2">
      <p class="copy">TM & © . All Rights Reserved</p>
      <ul class="legal">
        <li class="legal__link"><a href="#!">Terms of Use</a></li>
        <li class="legal__link">
          <a href="#!">Additional Content Information</a>
        </li>
        <li class="legal__link"><a href="#!">Privacy Policy</a></li>
      </ul>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.footer {
  color: var(--blue-500);
}
.legal {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: 1;
}
.legal__link {
  display: inline-block;
  margin: 6px 0 0;
  padding: 0 11px 0 12px;
  border-left: 1px solid grey;
  &:first-child {
    border-left: none;
  }
  a {
    text-underline-offset: var(--offset, 0.2em);
    transition: --offset 400ms, text-decoration-color 400ms;
    color: var(--common-white);
    text-decoration: underline 0.15em;
  }
  &:hover {
    a {
      --offset: 0.4em;
      text-decoration-color: var(--primary-color);
    }
  }
  @supports not (background: paint(something)) {
    a {
      transition: text-underline-offset 400ms, text-decoration-color 400ms;
    }
    a:hover,
    a:focus {
      text-underline-offset: 0.4em;
    }
  }
}
</style>
