"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
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
        const old_credentials = non_empty_trimmed_lines((yield file.readFile()).toString());
        const new_credentials = credentials.filter(entry => !old_credentials.includes(entry));
        // Replace the entire file, so it doesn't matter if it ended with a newline before.
        file.truncate(0);
        for (const credential of old_credentials) {
            yield file.write(credential + "\n");
        }
        for (const credential of new_credentials) {
            yield file.write(credential + "\n");
        }
        // Add git configuration.
        yield exec_1.exec('git', ['config', '--global', 'credential.helper', 'store']);
        yield exec_1.exec('git', ['config', '--global', '--replace-all', 'url.https://github.com/.insteadOf', 'ssh://git@github.com/']);
        yield exec_1.exec('git', ['config', '--global', '--add', 'url.https://github.com/.insteadOf', 'git@github.com:']);
    });
}
run().catch(error => {
    core.setFailed(error.message);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQXNDO0FBQ3RDLHdDQUFxQztBQUVyQywyQkFBb0M7QUFDcEMsaURBQW1DO0FBQ25DLHVDQUF5QjtBQUV6QixTQUFTLGVBQWU7SUFDdkIsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZELElBQUksZUFBZTtRQUFFLE9BQU8sZUFBZSxDQUFDO0lBQzVDLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQTtBQUNqQyxDQUFDO0FBRUQsU0FBUyx1QkFBdUIsQ0FBQyxLQUFhO0lBQzdDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7U0FDekIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUVELFNBQWUsR0FBRzs7UUFDakIsTUFBTSxXQUFXLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTlGLGlFQUFpRTtRQUNqRSxtSEFBbUg7UUFDbkgsTUFBTSxhQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsZUFBZSxFQUFFLE1BQU0sRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sSUFBSSxHQUFHLE1BQU0sYUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEYsTUFBTSxlQUFlLEdBQUcsdUJBQXVCLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDcEYsTUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRXRGLG1GQUFtRjtRQUNuRixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLEtBQUssTUFBTSxVQUFVLElBQUksZUFBZSxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDcEM7UUFDRCxLQUFLLE1BQU0sVUFBVSxJQUFJLGVBQWUsRUFBRTtZQUN6QyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ3BDO1FBRUQseUJBQXlCO1FBQ3pCLE1BQU0sV0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN4RSxNQUFNLFdBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxtQ0FBbUMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7UUFDekgsTUFBTSxXQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzVHLENBQUM7Q0FBQTtBQUVELEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtJQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvcmUgZnJvbSAnQGFjdGlvbnMvY29yZSc7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSAnQGFjdGlvbnMvZXhlYyc7XG5cbmltcG9ydCB7IHByb21pc2VzIGFzIGZzIH0gZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcHJvY2VzcyBmcm9tICdwcm9jZXNzJztcbmltcG9ydCAqIGFzIG9zIGZyb20gJ29zJztcblxuZnVuY3Rpb24geGRnX2NvbmZpZ19ob21lKCkge1xuXHRjb25zdCB4ZGdfY29uZmlnX2hvbWUgPSBwcm9jZXNzLmVudlsnWERHX0NPTkZJR19IT01FJ107XG5cdGlmICh4ZGdfY29uZmlnX2hvbWUpIHJldHVybiB4ZGdfY29uZmlnX2hvbWU7XG5cdHJldHVybiBgJHtvcy5ob21lZGlyKCl9Ly5jb25maWdgXG59XG5cbmZ1bmN0aW9uIG5vbl9lbXB0eV90cmltbWVkX2xpbmVzKGlucHV0OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG5cdHJldHVybiBpbnB1dC5zcGxpdCgvXFxyP1xcbi8pXG5cdFx0Lm1hcChsaW5lID0+IGxpbmUudHJpbSgpKVxuXHRcdC5maWx0ZXIobGluZSA9PiBsaW5lLmxlbmd0aCA+IDApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW4oKSB7XG5cdGNvbnN0IGNyZWRlbnRpYWxzID0gbm9uX2VtcHR5X3RyaW1tZWRfbGluZXMoY29yZS5nZXRJbnB1dCgnY3JlZGVudGlhbHMnLCB7IHJlcXVpcmVkOiB0cnVlIH0pKTtcblxuXHQvLyBHZXQgdGhlIGN1cnJlbnQgY3JlZGVudGlhbHMgc28gd2UgY2FuIGF2b2lkIGFkZGluZyBkdXBsaWNhdGVzLlxuXHQvLyBPbiBzZWxmLWhvc3RlZCBydW5uZXJzLCB0aGUgY3JlZGVudGlhbHMgZmlsZSBjb3VsZCBiZSByZXRhaW5lZCBiZXR3ZWVuIHJ1bnMsIHNvIHdlIGRvbid0IHdhbnQgdG8gYWRkIGR1cGxpY2F0ZXMuXG5cdGF3YWl0IGZzLm1rZGlyKGAke3hkZ19jb25maWdfaG9tZSgpfS9naXRgLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblx0Y29uc3QgZmlsZSA9IGF3YWl0IGZzLm9wZW4oYCR7eGRnX2NvbmZpZ19ob21lKCl9L2dpdC9jcmVkZW50aWFsc2AsIFwiYStcIiwgMG82MDApO1xuXHRjb25zdCBvbGRfY3JlZGVudGlhbHMgPSBub25fZW1wdHlfdHJpbW1lZF9saW5lcygoYXdhaXQgZmlsZS5yZWFkRmlsZSgpKS50b1N0cmluZygpKTtcblx0Y29uc3QgbmV3X2NyZWRlbnRpYWxzID0gY3JlZGVudGlhbHMuZmlsdGVyKGVudHJ5ID0+ICFvbGRfY3JlZGVudGlhbHMuaW5jbHVkZXMoZW50cnkpKTtcblxuXHQvLyBSZXBsYWNlIHRoZSBlbnRpcmUgZmlsZSwgc28gaXQgZG9lc24ndCBtYXR0ZXIgaWYgaXQgZW5kZWQgd2l0aCBhIG5ld2xpbmUgYmVmb3JlLlxuXHRmaWxlLnRydW5jYXRlKDApO1xuXHRmb3IgKGNvbnN0IGNyZWRlbnRpYWwgb2Ygb2xkX2NyZWRlbnRpYWxzKSB7XG5cdFx0YXdhaXQgZmlsZS53cml0ZShjcmVkZW50aWFsICsgXCJcXG5cIik7XG5cdH1cblx0Zm9yIChjb25zdCBjcmVkZW50aWFsIG9mIG5ld19jcmVkZW50aWFscykge1xuXHRcdGF3YWl0IGZpbGUud3JpdGUoY3JlZGVudGlhbCArIFwiXFxuXCIpO1xuXHR9XG5cblx0Ly8gQWRkIGdpdCBjb25maWd1cmF0aW9uLlxuXHRhd2FpdCBleGVjKCdnaXQnLCBbJ2NvbmZpZycsICctLWdsb2JhbCcsICdjcmVkZW50aWFsLmhlbHBlcicsICdzdG9yZSddKTtcblx0YXdhaXQgZXhlYygnZ2l0JywgWydjb25maWcnLCAnLS1nbG9iYWwnLCAnLS1yZXBsYWNlLWFsbCcsICd1cmwuaHR0cHM6Ly9naXRodWIuY29tLy5pbnN0ZWFkT2YnLCAnc3NoOi8vZ2l0QGdpdGh1Yi5jb20vJ10pO1xuXHRhd2FpdCBleGVjKCdnaXQnLCBbJ2NvbmZpZycsICctLWdsb2JhbCcsICctLWFkZCcsICd1cmwuaHR0cHM6Ly9naXRodWIuY29tLy5pbnN0ZWFkT2YnLCAnZ2l0QGdpdGh1Yi5jb206J10pO1xufVxuXG5ydW4oKS5jYXRjaChlcnJvciA9PiB7XG5cdGNvcmUuc2V0RmFpbGVkKGVycm9yLm1lc3NhZ2UpO1xufSk7XG4iXX0=