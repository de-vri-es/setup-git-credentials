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
        const secret = core.getInput('secret');
        const credentials = process.env[secret];
        if (!credentials) {
            throw new Error(`Credentials environment variable '${secret}' is not set`);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQXNDO0FBQ3RDLHdDQUFxQztBQUVyQywyQkFBb0M7QUFDcEMsaURBQW1DO0FBQ25DLHVDQUF5QjtBQUV6QixTQUFTLGVBQWU7SUFDdkIsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZELElBQUksZUFBZTtRQUFFLE9BQU8sZUFBZSxDQUFDO0lBQzVDLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQTtBQUNqQyxDQUFDO0FBRUQsU0FBZSxHQUFHOztRQUNqQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxNQUFNLGNBQWMsQ0FBQyxDQUFDO1NBQzNFO1FBRUQscUJBQXFCO1FBQ3JCLE1BQU0sYUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLGVBQWUsRUFBRSxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNoRSxNQUFNLGFBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUVwRyx5QkFBeUI7UUFDekIsTUFBTSxXQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sV0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQVcsbUNBQW1DLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1FBQ2pILE1BQU0sV0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUM1RyxDQUFDO0NBQUE7QUFFRCxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb3JlIGZyb20gJ0BhY3Rpb25zL2NvcmUnO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ0BhY3Rpb25zL2V4ZWMnO1xuXG5pbXBvcnQgeyBwcm9taXNlcyBhcyBmcyB9IGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHByb2Nlc3MgZnJvbSAncHJvY2Vzcyc7XG5pbXBvcnQgKiBhcyBvcyBmcm9tICdvcyc7XG5cbmZ1bmN0aW9uIHhkZ19jb25maWdfaG9tZSgpIHtcblx0Y29uc3QgeGRnX2NvbmZpZ19ob21lID0gcHJvY2Vzcy5lbnZbJ1hHRF9DT05GSUdfSE9NRSddO1xuXHRpZiAoeGRnX2NvbmZpZ19ob21lKSByZXR1cm4geGRnX2NvbmZpZ19ob21lO1xuXHRyZXR1cm4gYCR7b3MuaG9tZWRpcigpfS8uY29uZmlnYFxufVxuXG5hc3luYyBmdW5jdGlvbiBydW4oKSB7XG5cdGNvbnN0IHNlY3JldCA9IGNvcmUuZ2V0SW5wdXQoJ3NlY3JldCcpO1xuXHRjb25zdCBjcmVkZW50aWFscyA9IHByb2Nlc3MuZW52W3NlY3JldF07XG5cdGlmICghY3JlZGVudGlhbHMpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYENyZWRlbnRpYWxzIGVudmlyb25tZW50IHZhcmlhYmxlICcke3NlY3JldH0nIGlzIG5vdCBzZXRgKTtcblx0fVxuXG5cdC8vIFdyaXRlIGNyZWRlbnRpYWxzLlxuXHRhd2FpdCBmcy5ta2RpcihgJHt4ZGdfY29uZmlnX2hvbWUoKX0vZ2l0YCwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cdGF3YWl0IGZzLndyaXRlRmlsZShgJHt4ZGdfY29uZmlnX2hvbWUoKX0vZ2l0L2NyZWRlbnRpYWxzYCwgY3JlZGVudGlhbHMsIHsgZmxhZzogJ2EnLCBtb2RlOiAwbzYwMCB9KTtcblxuXHQvLyBBZGQgZ2l0IGNvbmZpZ3VyYXRpb24uXG5cdGF3YWl0IGV4ZWMoJ2dpdCcsIFsnY29uZmlnJywgJy0tZ2xvYmFsJywgJ2NyZWRlbnRpYWwuaGVscGVyJywgJ3N0b3JlJ10pO1xuXHRhd2FpdCBleGVjKCdnaXQnLCBbJ2NvbmZpZycsICctLWdsb2JhbCcsICAgICAgICAgICd1cmwuaHR0cHM6Ly9naXRodWIuY29tLy5pbnN0ZWFkT2YnLCAnc3NoOi8vZ2l0QGdpdGh1Yi5jb20vJ10pO1xuXHRhd2FpdCBleGVjKCdnaXQnLCBbJ2NvbmZpZycsICctLWdsb2JhbCcsICctLWFkZCcsICd1cmwuaHR0cHM6Ly9naXRodWIuY29tLy5pbnN0ZWFkT2YnLCAnZ2l0QGdpdGh1Yi5jb206J10pO1xufVxuXG5ydW4oKS5jYXRjaChlcnJvciA9PiB7XG5cdGNvcmUuc2V0RmFpbGVkKGVycm9yLm1lc3NhZ2UpO1xufSk7XG4iXX0=