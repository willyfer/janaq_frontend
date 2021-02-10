<template>
  <div class="home bg-white">
    <b-navbar toggleable="lg" type="dark" variant="white">
      <b-navbar-brand href="#" class="text-dark">Dashboard</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav class="text-dark">
        <b-navbar-nav>
          <b-nav-item href="/about">About</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-avatar variant="primary" text="BV"></b-avatar>
            </template>
            <b-dropdown-item href="#">--</b-dropdown-item>
            <b-dropdown-item @click="logout">Cerrar Sesión</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <button @click="gettoken">get token</button>
    {{ token }}
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},

  data() {
    return {
      token: "sin data",
    };
  },
  methods: {
    gettoken() {
      this.token = localStorage.getItem("token");
    },
    pushlogin() {
      var self = this;
      setInterval(function () {
        self.$router.push("login").catch(() => {});
      }, 1000);
    },
    logout() {
      this.formIsVisible = false;

      console.log("fomr data", this.token);
      var self = this;
      var header = {
        Authorization: `Bearer ${this.token}`,
        "Content-type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      };
      fetch("http://127.0.0.1:8000/api/auth/logout", {
        method: "get",
        headers: header,
      })
        .then(function (response) {
          if (response.status !== 200) {
            console.log("Algo anda mal. Status Code: " + response.status);
            return;
          }

          // Examine the text in the response
          response.json().then(function (data) {
            console.log("llegada", data);

            localStorage.removeItem("token");
            self.pushlogin();
          });
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        })
        .finally(() => {
          localStorage.removeItem("token");
          self.formIsVisible = true;
        });
    },
  },
};
</script>
