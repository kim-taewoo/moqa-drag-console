<template>
  <v-expansion-panel v-model="panel" expand>
    <v-expansion-panel-content>
      <div slot="header">Q{{questionIndex+1}}. 동영상 <small class="gray--text"> (Full)</small><span class="q-title">: {{qTitle}}</span> </div>
      <div slot="actions"><v-icon class="white--text">keyboard_arrow_down</v-icon> </div>
      <v-card>
          <v-container>
              <v-layout wrap justify-center>
                  <v-flex xs10 class="text-xs-center">
                      <v-flex class="xs12">
                        <video id="video" width="320" height="240" controls></video>
                      </v-flex>
                      <v-btn @click="onPickFile" dark class="amber">
                          동영상 업로드 <v-icon right dark>cloud_upload</v-icon>
                      </v-btn>
                      <input type="file" style="display:none;" ref="fileInput" accept="video/*" @change="onFilePicked">
                  </v-flex>
                  <v-flex xs10>
                      <v-text-field label="설명" v-model="qTitle"></v-text-field>
                  </v-flex>
              </v-layout>
          </v-container>
      </v-card>
      
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>

  export default {
    name: 'StarRating',
    props: ['questionIndex'],
    data () {
      return {
        panel: [true],
        qTitle: null,
        active: null,
        videoUrl: [],
      }
    },
    methods: {
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
          const files = event.target.files
          console.log('1:', files)
          const file = files[0]
          let filename = file.name
          let filesize = file.size
          console.log(filesize)
          var video = document.getElementById('video');
          if (filename.lastIndexOf('.') <= 0) {
              return alert('유효한 동영상 파일을 업로드 해주세요!')
          }
          if (filesize > 15728640) {
            return alert('15mb 이상의 파일은 업로드할 수 없습니다.')
          }
          
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
            video.src = fileReader.result
          })
          

          fileReader.readAsDataURL(file)
        //   var rawData = fileReader.readAsBinaryString(file)
        //   console.log(rawData)
        //   var binaryData = [];
        //   binaryData.push(rawData)
        //   var video = document.getElementById('video');
        //   var obj_url = window.URL.createObjectURL(file);
        //   video.src = obj_url;
        //   video.play()
        //   window.URL.revokeObjectURL(obj_url);
      }
    }
  }
</script>

<style>
.v-expansion-panel__header {
  background:#00BCD4;
  color: white;
}
.header__icon {
  color: white;
}
.q-title {
  max-width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
