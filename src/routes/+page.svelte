<script>
  import Modal from "../components/Modal/Modal.svelte";
  import GlobalData from "../components/GlobalData/GlobalData.svelte";
  import Notification from "../components/Notification/Notification.svelte";
  import ShaderToy from "../components/ShaderToy/ShaderToy.svelte";
  import OShader from "../components/ShaderToy/O.shader";
    import Logic from "../components/Logic/Logic.svelte";
</script>

<Logic/>
<!-- <Notification>
  <ShaderToy shader={OShader} iChannel0={'./t1.jpg'} iChannel1={'./t1.jpg'} />
</Notification> -->
<GlobalData />
<!-- <Modal id={1}>
  <ModalSchedule/>
</Modal> -->

<style lang="scss">
  @import "./styles/reset.scss";
  @import "./styles/global.scss";
</style>