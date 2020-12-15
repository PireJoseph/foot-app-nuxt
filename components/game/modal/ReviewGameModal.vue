<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Review past game
      </p>
    </header>
    <div class="modal-card-body">
      <ValidationObserver v-slot="{ invalid }">
        <form>
          <!-- Team A Goals -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="minValue:0|maxValue:100"
          >
            <b-field
              label="Team A Goals"
              :type="{
                'is-danger': errors.length,
                'is-success': !errors.length,
              }"
              :message="errors[0]"
            >
              <b-numberinput
                v-model="updateGameData.teamAGoals"
              ></b-numberinput>
            </b-field>
          </ValidationProvider>

          <!-- Team B Goals -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="minValue:0|maxValue:100"
          >
            <b-field
              label="Team B Goals"
              :type="{
                'is-danger': errors.length,
                'is-success': !errors.length,
              }"
              :message="errors[0]"
            >
              <b-numberinput
                v-model="updateGameData.teamBGoals"
              ></b-numberinput>
            </b-field>
          </ValidationProvider>

          <!-- pictures -->
          <div id="pictures-upload-container">
            <b-field class="file">
              <b-upload name="avatar" expanded @input="onPicturesInput">
                <a class="button is-primary is-fullwidth">
                  <b-icon icon="upload"> </b-icon>
                  <span v-if="!pictureErrorMesssage">
                    Upload picture
                  </span>
                  <span v-else>
                    {{ pictureErrorMesssage }}
                  </span>
                </a>
              </b-upload>
            </b-field>
          </div>

          <!-- Update button -->
          <div class="buttons">
            <b-button
              tag="input"
              value="Update"
              expanded
              :type="{
                'is-danger': invalid,
                'is-success': !invalid,
              }"
              :disabled="invalid"
              :loading="loading"
              @click="reviewGame"
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
  props: {
    game: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      updateGameData: {
        teamAGoals: 0,
        teamBGoals: 0,
      },
      pictureErrorMesssage: '',
    }
  },
  mounted() {
    this.updateGameData.teamAGoals = this.game.teamAGoals
    this.updateGameData.teamBGoals = this.game.teamBGoals
  },
  methods: {
    async reviewGame() {
      const { data } = await this.$axios.put(
        '/games/' + this.game.id + '/review',
        this.updateGameData
      )
      this.$emit('game-reviewed', data)
      this.$buefy.toast.open({
        message: 'Field created successfully',
        type: 'is-success',
      })
    },
    async onPicturesInput(file) {
      const formData = new FormData()
      formData.append('ref', 'game')
      formData.append('refId', this.game.id)
      formData.append('field', 'pictures')
      formData.append('files', file, file.name)
      try {
        const response = await this.$axios.post('/upload', formData)
        const picture = response.data[0]
        this.game.pictures = [...this.game.pictures, picture]
        this.pictureErrorMesssage = ''
        this.$buefy.toast.open({
          message: 'Picture uploaded successfully',
          type: 'is-success',
        })
      } catch (error) {
        this.pictureErrorMesssage = 'picture upload failed :c'
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.button {
  margin-top: 1em;
}
</style>
