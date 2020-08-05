<template>
  <div>
    <div class="content">Join an existing group</div>
    <div class="content">
      <ValidationObserver v-slot="{ invalid }">
        <form>
          <!-- name -->
          <ValidationProvider
            v-slot="{ errors }"
            immediate
            rules="min:8|max:30|required"
          >
            <b-field
              label="Name"
              :type="{
                'is-danger': errors.length || joinGroupNameErrorMessage,
                'is-success': !errors.length && !joinGroupNameErrorMessage,
              }"
              :message="errors[0] || joinGroupNameErrorMessage"
            >
              <b-input
                v-model="joinGroup.name"
                maxlength="30"
                @input="joinGroupNameErrorMessage = ''"
              ></b-input>
            </b-field>
          </ValidationProvider>

          <!-- Password field -->
          <ValidationProvider
            v-slot="{ errors }"
            immediate
            rules="min:8|max:30|required"
            vid="password"
          >
            <b-field
              label="Password"
              :type="{
                'is-danger': errors.length,
                'is-success': !errors.length && !joinGroupPasswordMessage,
              }"
              :message="errors[0]"
            >
              <b-input
                v-model="joinGroup.password"
                type="password"
                password-reveal
                maxlength="30"
              >
              </b-input>
            </b-field>
          </ValidationProvider>

          <!-- Join button -->
          <div id="update-container" class="buttons">
            <b-button
              tag="input"
              value="Join"
              expanded
              :type="{
                'is-danger': invalid,
                'is-success': !invalid,
              }"
              :disabled="invalid"
              :loading="loading"
              @click="joinExistingGroup"
            />
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      loading: false,
      joinGroup: {
        name: '',
        password: '',
      },
      joinGroupNameErrorMessage: '',
      joinGroupPasswordMessage: '',
    }
  },
  methods: {
    // join an existing group
    async joinExistingGroup() {
      const { data } = await this.$axios.post('/groups/join', this.joinGroup)
      this.joinGroup = {
        name: '',
        password: '',
      }
      this.$store.commit('community/addGroup', data)
      this.$buefy.toast.open({
        message: 'Group joined successfully',
        type: 'is-success',
      })
    },
  },
}
</script>
