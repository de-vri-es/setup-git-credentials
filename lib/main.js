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
    const xdg_config_home = process.env['XGD_CONFIG_HOME'];
    if (xdg_config_home)
        return xdg_config_home;
    return `${os.homedir()}/.config`;
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = core.getInput('credentials', { required: true });
        // Write credentials.
        yield fs_1.promises.mkdir(`${xdg_config_home()}/git`, { recursive: true });
        yield fs_1.promises.writeFile(`${xdg_config_home()}/git/credentials`, credentials, { flag: 'a', mode: 0o600 });
        // Add git configuration.
        yield exec_1.exec('git', ['config', '--global', 'credential.helper', 'store']);
        yield exec_1.exec('git', ['config', '--global', 'url.https://github.com/.insteadOf', 'ssh://git@github.com/']);
        yield exec_1.exec('git', ['config', '--global', '--add', 'url.https://github.com/.insteadOf', 'git@github.com:']);
    });
}
run().catch(error => {
    core.setFailed(error.message);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQXNDO0FBQ3RDLHdDQUFxQztBQUVyQywyQkFBb0M7QUFDcEMsaURBQW1DO0FBQ25DLHVDQUF5QjtBQUV6QixTQUFTLGVBQWU7SUFDdkIsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZELElBQUksZUFBZTtRQUFFLE9BQU8sZUFBZSxDQUFDO0lBQzVDLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQTtBQUNqQyxDQUFDO0FBRUQsU0FBZSxHQUFHOztRQUNqQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXJFLHFCQUFxQjtRQUNyQixNQUFNLGFBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxlQUFlLEVBQUUsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDaEUsTUFBTSxhQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsZUFBZSxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFcEcseUJBQXlCO1FBQ3pCLE1BQU0sV0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN4RSxNQUFNLFdBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFXLG1DQUFtQyxFQUFFLHVCQUF1QixDQUFDLENBQUMsQ0FBQztRQUNqSCxNQUFNLFdBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDNUcsQ0FBQztDQUFBO0FBRUQsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO0lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29yZSBmcm9tICdAYWN0aW9ucy9jb3JlJztcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICdAYWN0aW9ucy9leGVjJztcblxuaW1wb3J0IHsgcHJvbWlzZXMgYXMgZnMgfSBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwcm9jZXNzIGZyb20gJ3Byb2Nlc3MnO1xuaW1wb3J0ICogYXMgb3MgZnJvbSAnb3MnO1xuXG5mdW5jdGlvbiB4ZGdfY29uZmlnX2hvbWUoKSB7XG5cdGNvbnN0IHhkZ19jb25maWdfaG9tZSA9IHByb2Nlc3MuZW52WydYR0RfQ09ORklHX0hPTUUnXTtcblx0aWYgKHhkZ19jb25maWdfaG9tZSkgcmV0dXJuIHhkZ19jb25maWdfaG9tZTtcblx0cmV0dXJuIGAke29zLmhvbWVkaXIoKX0vLmNvbmZpZ2Bcbn1cblxuYXN5bmMgZnVuY3Rpb24gcnVuKCkge1xuXHRjb25zdCBjcmVkZW50aWFscyA9IGNvcmUuZ2V0SW5wdXQoJ2NyZWRlbnRpYWxzJywgeyByZXF1aXJlZDogdHJ1ZSB9KTtcblxuXHQvLyBXcml0ZSBjcmVkZW50aWFscy5cblx0YXdhaXQgZnMubWtkaXIoYCR7eGRnX2NvbmZpZ19ob21lKCl9L2dpdGAsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuXHRhd2FpdCBmcy53cml0ZUZpbGUoYCR7eGRnX2NvbmZpZ19ob21lKCl9L2dpdC9jcmVkZW50aWFsc2AsIGNyZWRlbnRpYWxzLCB7IGZsYWc6ICdhJywgbW9kZTogMG82MDAgfSk7XG5cblx0Ly8gQWRkIGdpdCBjb25maWd1cmF0aW9uLlxuXHRhd2FpdCBleGVjKCdnaXQnLCBbJ2NvbmZpZycsICctLWdsb2JhbCcsICdjcmVkZW50aWFsLmhlbHBlcicsICdzdG9yZSddKTtcblx0YXdhaXQgZXhlYygnZ2l0JywgWydjb25maWcnLCAnLS1nbG9iYWwnLCAgICAgICAgICAndXJsLmh0dHBzOi8vZ2l0aHViLmNvbS8uaW5zdGVhZE9mJywgJ3NzaDovL2dpdEBnaXRodWIuY29tLyddKTtcblx0YXdhaXQgZXhlYygnZ2l0JywgWydjb25maWcnLCAnLS1nbG9iYWwnLCAnLS1hZGQnLCAndXJsLmh0dHBzOi8vZ2l0aHViLmNvbS8uaW5zdGVhZE9mJywgJ2dpdEBnaXRodWIuY29tOiddKTtcbn1cblxucnVuKCkuY2F0Y2goZXJyb3IgPT4ge1xuXHRjb3JlLnNldEZhaWxlZChlcnJvci5tZXNzYWdlKTtcbn0pO1xuIl19