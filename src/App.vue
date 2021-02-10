<template>
  <div id="app" class="bg-body pt-5 h-full">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      | <router-link to="/register">REGISTER</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style >
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;

  background-image: url("./assets/images/colorful.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
}

#nav {
  padding: 30px;
}
.bg-azul {
  background-color: #0f5ef7 !important;
}
.bg-body {
  background-color: #eaecf5 !important;
}
.bg-btn {
  background-color: #041c4a !important;
}
body {
  margin: 0;
  padding: 0;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
