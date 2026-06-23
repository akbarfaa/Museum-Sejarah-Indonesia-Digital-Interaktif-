import { Scene, SceneLoader, Vector3, AbstractMesh } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

export function loadArtGalleryModel(
  scene: Scene,
  position: Vector3,
  scale: Vector3,
  rotation: Vector3,
  onLoaded?: (meshes: AbstractMesh[]) => void
) {
  console.log("Memulai pemuatan model Art Gallery glTF...");
  
  SceneLoader.ImportMesh(
    "",
    "/assets/models/",
    "art_gallery.gltf",
    scene,
    (meshes) => {
      console.log(`Model Art Gallery glTF berhasil dimuat! Jumlah mesh: ${meshes.length}`);
      
      // Ambil lampu khusus agar kita bisa mendaftarkan mesh ke dalamnya
      const gltfHemi = scene.getLightByName("gltfHemi");
      const gltfLight1 = scene.getLightByName("gltfLight1");
      const gltfLight2 = scene.getLightByName("gltfLight2");
      const gltfLight3 = scene.getLightByName("gltfLight3");

      meshes.forEach((mesh) => {
        // Jika mesh tidak memiliki parent, atur posisi, rotasi, dan skalanya
        if (!mesh.parent) {
          mesh.position.addInPlace(position);
          mesh.scaling.copyFrom(scale);
          mesh.rotation.addInPlace(rotation);
        }
        
        // Aktifkan collision untuk mesh agar player tidak bisa menembus dinding/lantai
        mesh.checkCollisions = true;

        // Daftarkan mesh ke lampu khusus agar hanya diterangi oleh lampu ini
        const className = mesh.getClassName();
        const isRenderableMesh = className === "Mesh" || className === "InstancedMesh" || className === "AbstractMesh";

        if (isRenderableMesh) {
          if (gltfHemi) gltfHemi.includedOnlyMeshes.push(mesh);
          if (gltfLight1) gltfLight1.includedOnlyMeshes.push(mesh);
          if (gltfLight2) gltfLight2.includedOnlyMeshes.push(mesh);
          if (gltfLight3) gltfLight3.includedOnlyMeshes.push(mesh);
        }

        // Modifikasi material agar lebih terang benderang
        if (mesh.material) {
          const mat = mesh.material as any;
          
          // Naikkan intensitas cahaya pada material PBR
          if (mat.directIntensity !== undefined) {
            mat.directIntensity = 2.5; 
          }
          if (mat.environmentIntensity !== undefined) {
            mat.environmentIntensity = 2.0;
          }
          
          // Berikan sedikit emissive color konstan agar tekstur tetap terlihat meskipun di sudut gelap
          if (mat.emissiveColor) {
            // Naikkan sedikit kecerahan dasar material
            mat.emissiveColor.copyFromFloats(0.22, 0.22, 0.22);
          }
        }
      });

      if (onLoaded) {
        onLoaded(meshes);
      }
    },
    (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        console.log(`Progress Pemuatan Model: ${percent}%`);
      }
    },
    (scene, message, exception) => {
      console.error("Gagal memuat model Art Gallery glTF:", message, exception);
    }
  );
}
