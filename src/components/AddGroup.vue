<template>
    <v-container>
        <v-layout justify-center wrap>
            <v-flex class="xs12">
                <div class="main-flex">
                    <v-icon large>group_add</v-icon> <div class="main-title"><strong>맞춤타겟 추가하기</strong> </div>
                </div>
                <v-divider></v-divider>
            </v-flex>
            <v-flex class="xs12 my-3">
                <v-text-field prepend-icon="add" label="그룹명"></v-text-field>
            </v-flex>
            <v-flex class="xs12">
                <v-divider></v-divider>
                <p class="my-2">검색대상자 <span class="red--text">0</span> 명</p>
            </v-flex>
            <v-flex class="xs12 mt-5">
                <v-btn @click.stop="dialogFull = true" block color="pink" dark><v-icon>add</v-icon> 대상선택</v-btn>
                <v-dialog v-model="dialogFull" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <v-card>
                        <v-toolbar dark color="primary">
                            <v-btn icon dark @click.native="dialogFull = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                            <v-toolbar-title>Settings</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                                <v-btn dark flat @click.native="dialogFull = false">Save</v-btn>
                            </v-toolbar-items>
                        </v-toolbar>
                    </v-card>
                </v-dialog>
            </v-flex>
            <v-flex class="xs12 mt-5 text-xs-center">
                <v-divider></v-divider>
                <v-btn color="success">그룹 생성</v-btn>
                <v-btn color="white">취소</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'AddGroup',
    data () {
        return {
            dialogFull: false,
        }
    }
}
</script>

<style>
.main-title {
    display: inline-flex;
    margin-left: 10px;
    font-size: 1.2rem;
}
.main-flex   {
    display: flex;
    align-items: center;
}
</style>

