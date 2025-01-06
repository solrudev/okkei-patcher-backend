import { Entity } from "typeorm";
import { LegacyPatchFile } from "./legacy-patch-file.entity";

@Entity("patch_en")
export class LegacyEnglishPatchFile extends LegacyPatchFile {
}