<script lang="ts" setup></script>
<template>
  <nav>
    <ul
      class="social__links flex align-items-center justify-content-center p-0"
    >
      <li className="border-white  px-2">
        <a href="#!"><i class="pi pi-facebook text-2xl"> </i></a>
      </li>
      <li class="border-white px-2 text-2xl">
        <a href="#!"><i class="pi pi-instagram text-2xl"> </i></a>
      </li>
      <li class="border-white px-2">
        <a href="#!"><i class="pi pi-twitter text-2xl"> </i></a>
      </li>
      <li class="border-white px-2">
        <a href="#!"><i class="pi pi-youtube text-2xl"> </i></a>
      </li>
    </ul>
  </nav>
</template>
<style lang="scss" scoped>
.social__links {
  list-style: none;
  a {
    color: var(--color-white);
    font-size: 2rem;
  }
}
</style>
