<template>
  <div>
    <div class="content">Create a new group</div>
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
                'is-danger': errors.length || newGroupNameErrorMessage,
                'is-success': !errors.length && !newGroupNameErrorMessage,
              }"
              :message="errors[0] || newGroupNameErrorMessage"
            >
              <b-input
                v-model="newGroup.name"
                maxlength="30"
                @input="newGroupNameErrorMessage = ''"
              ></b-input>
            </b-field>
          </ValidationProvider>

          <!-- isOpen -->
          <b-field label="Joinable without invitation">
            <b-switch v-model="newGroup.isOpen">
              {{ newGroup.isOpen }}
            </b-switch>
          </b-field>

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
                'is-success': !errors.length && !newGroupNamePasswordMessage,
              }"
              :message="errors[0]"
            >
              <b-input
                v-model="newGroup.password"
                type="password"
                password-reveal
                maxlength="30"
              >
              </b-input>
            </b-field>
          </ValidationProvider>

          <!-- Confirm field -->
          <ValidationProvider
            v-slot="{ errors }"
            immediate
            rules="min:8|max:30|required|confirmed:password"
          >
            <b-field
              label="Confirm password"
              :type="{
                'is-danger': errors.length,
                'is-success': !errors.length,
              }"
              :message="errors[0]"
            >
              <b-input
                v-model="newGroupPasswordConfirmation"
                type="password"
                password-reveal
                maxlength="30"
              >
              </b-input>
            </b-field>
          </ValidationProvider>

          <!-- Create button -->
          <div id="update-container" class="buttons">
            <b-button
              tag="input"
              value="Create"
              expanded
              :type="{
                'is-danger': invalid,
                'is-success': !invalid,
              }"
              :disabled="invalid"
              :loading="loading"
              @click="createNewGroup"
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
      newGroup: {
        name: '',
        password: '',
        isOpen: true,
      },
      newGroupNameErrorMessage: '',
      newGroupNamePasswordMessage: '',
      newGroupPasswordConfirmation: '',
    }
  },
  methods: {
    // create a new group
    async createNewGroup() {
      const { data } = await this.$axios.post('/groups', this.newGroup)
      this.$store.commit('community/addGroup', data)
      this.newGroup = {
        name: '',
        password: '',
        isOpen: true,
      }
      this.newGroupPasswordConfirmation = ''
      this.$buefy.toast.open({
        message: 'Group created successfully',
        type: 'is-success',
      })
    },
  },
}
</script>
