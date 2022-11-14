"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec_1 = require("@actions/exec");
const fs_1 = require("fs");
const process = __importStar(require("process"));
const os = __importStar(require("os"));
function xdg_config_home() {
    const xdg_config_home = process.env['XDG_CONFIG_HOME'];
    if (xdg_config_home)
        return xdg_config_home;
    return `${os.homedir()}/.config`;
}
function non_empty_trimmed_lines(input) {
    return input.split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line.length > 0);
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = non_empty_trimmed_lines(core.getInput('credentials', { required: true }));
        // Get the current credentials so we can avoid adding duplicates.
        // On self-hosted runners, the credentials file could be retained between runs, so we don't want to add duplicates.
        yield fs_1.promises.mkdir(`${xdg_config_home()}/git`, { recursive: true });
        const file = yield fs_1.promises.open(`${xdg_config_home()}/git/credentials`, "a+", 0o600);
        const contents = (yield file.readFile()).toString();
        const old_credentials = non_empty_trimmed_lines(contents);
        const new_credentials = credentials.filter(entry => !old_credentials.includes(entry));
        // If the file didn't end with a newline, add one.
        if (contents.length > 0 && !contents.endsWith("\n")) {
            file.write("\n");
        }
        // Add credentials that aren't already in the file.
        for (const credential of new_credentials) {
            yield file.write(credential + "\n");
        }
        // Add git configuration.
        yield (0, exec_1.exec)('git', ['config', '--global', 'credential.helper', 'store']);
        yield (0, exec_1.exec)('git', ['config', '--global', '--replace-all', 'url.https://github.com/.insteadOf', 'ssh://git@github.com/']);
        yield (0, exec_1.exec)('git', ['config', '--global', '--add', 'url.https://github.com/.insteadOf', 'git@github.com:']);
    });
}
run().catch(error => {
    core.setFailed(error.message);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBc0M7QUFDdEMsd0NBQXFDO0FBRXJDLDJCQUFvQztBQUNwQyxpREFBbUM7QUFDbkMsdUNBQXlCO0FBRXpCLFNBQVMsZUFBZTtJQUN2QixNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkQsSUFBSSxlQUFlO1FBQUUsT0FBTyxlQUFlLENBQUM7SUFDNUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFBO0FBQ2pDLENBQUM7QUFFRCxTQUFTLHVCQUF1QixDQUFDLEtBQWE7SUFDN0MsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUN6QixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRUQsU0FBZSxHQUFHOztRQUNqQixNQUFNLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFOUYsaUVBQWlFO1FBQ2pFLG1IQUFtSDtRQUNuSCxNQUFNLGFBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxlQUFlLEVBQUUsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDaEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxhQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsZUFBZSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoRixNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEQsTUFBTSxlQUFlLEdBQUcsdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUQsTUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRXRGLGtEQUFrRDtRQUNsRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pCO1FBRUQsbURBQW1EO1FBQ25ELEtBQUssTUFBTSxVQUFVLElBQUksZUFBZSxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDcEM7UUFFRCx5QkFBeUI7UUFDekIsTUFBTSxJQUFBLFdBQUksRUFBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDeEUsTUFBTSxJQUFBLFdBQUksRUFBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxtQ0FBbUMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7UUFDekgsTUFBTSxJQUFBLFdBQUksRUFBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDNUcsQ0FBQztDQUFBO0FBRUQsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO0lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29yZSBmcm9tICdAYWN0aW9ucy9jb3JlJztcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICdAYWN0aW9ucy9leGVjJztcblxuaW1wb3J0IHsgcHJvbWlzZXMgYXMgZnMgfSBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwcm9jZXNzIGZyb20gJ3Byb2Nlc3MnO1xuaW1wb3J0ICogYXMgb3MgZnJvbSAnb3MnO1xuXG5mdW5jdGlvbiB4ZGdfY29uZmlnX2hvbWUoKSB7XG5cdGNvbnN0IHhkZ19jb25maWdfaG9tZSA9IHByb2Nlc3MuZW52WydYREdfQ09ORklHX0hPTUUnXTtcblx0aWYgKHhkZ19jb25maWdfaG9tZSkgcmV0dXJuIHhkZ19jb25maWdfaG9tZTtcblx0cmV0dXJuIGAke29zLmhvbWVkaXIoKX0vLmNvbmZpZ2Bcbn1cblxuZnVuY3Rpb24gbm9uX2VtcHR5X3RyaW1tZWRfbGluZXMoaW5wdXQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcblx0cmV0dXJuIGlucHV0LnNwbGl0KC9cXHI/XFxuLylcblx0XHQubWFwKGxpbmUgPT4gbGluZS50cmltKCkpXG5cdFx0LmZpbHRlcihsaW5lID0+IGxpbmUubGVuZ3RoID4gMCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1bigpIHtcblx0Y29uc3QgY3JlZGVudGlhbHMgPSBub25fZW1wdHlfdHJpbW1lZF9saW5lcyhjb3JlLmdldElucHV0KCdjcmVkZW50aWFscycsIHsgcmVxdWlyZWQ6IHRydWUgfSkpO1xuXG5cdC8vIEdldCB0aGUgY3VycmVudCBjcmVkZW50aWFscyBzbyB3ZSBjYW4gYXZvaWQgYWRkaW5nIGR1cGxpY2F0ZXMuXG5cdC8vIE9uIHNlbGYtaG9zdGVkIHJ1bm5lcnMsIHRoZSBjcmVkZW50aWFscyBmaWxlIGNvdWxkIGJlIHJldGFpbmVkIGJldHdlZW4gcnVucywgc28gd2UgZG9uJ3Qgd2FudCB0byBhZGQgZHVwbGljYXRlcy5cblx0YXdhaXQgZnMubWtkaXIoYCR7eGRnX2NvbmZpZ19ob21lKCl9L2dpdGAsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuXHRjb25zdCBmaWxlID0gYXdhaXQgZnMub3BlbihgJHt4ZGdfY29uZmlnX2hvbWUoKX0vZ2l0L2NyZWRlbnRpYWxzYCwgXCJhK1wiLCAwbzYwMCk7XG5cdGNvbnN0IGNvbnRlbnRzID0gKGF3YWl0IGZpbGUucmVhZEZpbGUoKSkudG9TdHJpbmcoKTtcblx0Y29uc3Qgb2xkX2NyZWRlbnRpYWxzID0gbm9uX2VtcHR5X3RyaW1tZWRfbGluZXMoY29udGVudHMpO1xuXHRjb25zdCBuZXdfY3JlZGVudGlhbHMgPSBjcmVkZW50aWFscy5maWx0ZXIoZW50cnkgPT4gIW9sZF9jcmVkZW50aWFscy5pbmNsdWRlcyhlbnRyeSkpO1xuXG5cdC8vIElmIHRoZSBmaWxlIGRpZG4ndCBlbmQgd2l0aCBhIG5ld2xpbmUsIGFkZCBvbmUuXG5cdGlmIChjb250ZW50cy5sZW5ndGggPiAwICYmICFjb250ZW50cy5lbmRzV2l0aChcIlxcblwiKSkge1xuXHRcdGZpbGUud3JpdGUoXCJcXG5cIik7XG5cdH1cblxuXHQvLyBBZGQgY3JlZGVudGlhbHMgdGhhdCBhcmVuJ3QgYWxyZWFkeSBpbiB0aGUgZmlsZS5cblx0Zm9yIChjb25zdCBjcmVkZW50aWFsIG9mIG5ld19jcmVkZW50aWFscykge1xuXHRcdGF3YWl0IGZpbGUud3JpdGUoY3JlZGVudGlhbCArIFwiXFxuXCIpO1xuXHR9XG5cblx0Ly8gQWRkIGdpdCBjb25maWd1cmF0aW9uLlxuXHRhd2FpdCBleGVjKCdnaXQnLCBbJ2NvbmZpZycsICctLWdsb2JhbCcsICdjcmVkZW50aWFsLmhlbHBlcicsICdzdG9yZSddKTtcblx0YXdhaXQgZXhlYygnZ2l0JywgWydjb25maWcnLCAnLS1nbG9iYWwnLCAnLS1yZXBsYWNlLWFsbCcsICd1cmwuaHR0cHM6Ly9naXRodWIuY29tLy5pbnN0ZWFkT2YnLCAnc3NoOi8vZ2l0QGdpdGh1Yi5jb20vJ10pO1xuXHRhd2FpdCBleGVjKCdnaXQnLCBbJ2NvbmZpZycsICctLWdsb2JhbCcsICctLWFkZCcsICd1cmwuaHR0cHM6Ly9naXRodWIuY29tLy5pbnN0ZWFkT2YnLCAnZ2l0QGdpdGh1Yi5jb206J10pO1xufVxuXG5ydW4oKS5jYXRjaChlcnJvciA9PiB7XG5cdGNvcmUuc2V0RmFpbGVkKGVycm9yLm1lc3NhZ2UpO1xufSk7XG4iXX0=