import { PatchFile } from "./patch-file.entity";
import { Entity } from "typeorm";

@Entity("patch_files_en")
export class EnglishPatchFile extends PatchFile {
}