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
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = core.getInput('credentials', { required: true });
        // Write credentials.
        yield fs_1.promises.mkdir(`${xdg_config_home()}/git`, { recursive: true });
        yield fs_1.promises.writeFile(`${xdg_config_home()}/git/credentials`, credentials, { flag: 'a', mode: 0o600 });
        // Add git configuration.
        yield exec_1.exec('git', ['config', '--global', 'credential.helper', 'store']);
        yield exec_1.exec('git', ['config', '--global', '--unset-all', 'url.https://github.com/.insteadOf']);
        yield exec_1.exec('git', ['config', '--global', 'url.https://github.com/.insteadOf', 'ssh://git@github.com/']);
        yield exec_1.exec('git', ['config', '--global', '--add', 'url.https://github.com/.insteadOf', 'git@github.com:']);
    });
}
run().catch(error => {
    core.setFailed(error.message);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQXNDO0FBQ3RDLHdDQUFxQztBQUVyQywyQkFBb0M7QUFDcEMsaURBQW1DO0FBQ25DLHVDQUF5QjtBQUV6QixTQUFTLGVBQWU7SUFDdkIsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZELElBQUksZUFBZTtRQUFFLE9BQU8sZUFBZSxDQUFDO0lBQzVDLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQTtBQUNqQyxDQUFDO0FBRUQsU0FBZSxHQUFHOztRQUNqQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXJFLHFCQUFxQjtRQUNyQixNQUFNLGFBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxlQUFlLEVBQUUsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDaEUsTUFBTSxhQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsZUFBZSxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFcEcseUJBQXlCO1FBQ3pCLE1BQU0sV0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN4RSxNQUFNLFdBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDLENBQUM7UUFDOUYsTUFBTSxXQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBVyxtQ0FBbUMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7UUFDakgsTUFBTSxXQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzVHLENBQUM7Q0FBQTtBQUVELEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtJQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvcmUgZnJvbSAnQGFjdGlvbnMvY29yZSc7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSAnQGFjdGlvbnMvZXhlYyc7XG5cbmltcG9ydCB7IHByb21pc2VzIGFzIGZzIH0gZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcHJvY2VzcyBmcm9tICdwcm9jZXNzJztcbmltcG9ydCAqIGFzIG9zIGZyb20gJ29zJztcblxuZnVuY3Rpb24geGRnX2NvbmZpZ19ob21lKCkge1xuXHRjb25zdCB4ZGdfY29uZmlnX2hvbWUgPSBwcm9jZXNzLmVudlsnWERHX0NPTkZJR19IT01FJ107XG5cdGlmICh4ZGdfY29uZmlnX2hvbWUpIHJldHVybiB4ZGdfY29uZmlnX2hvbWU7XG5cdHJldHVybiBgJHtvcy5ob21lZGlyKCl9Ly5jb25maWdgXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1bigpIHtcblx0Y29uc3QgY3JlZGVudGlhbHMgPSBjb3JlLmdldElucHV0KCdjcmVkZW50aWFscycsIHsgcmVxdWlyZWQ6IHRydWUgfSk7XG5cblx0Ly8gV3JpdGUgY3JlZGVudGlhbHMuXG5cdGF3YWl0IGZzLm1rZGlyKGAke3hkZ19jb25maWdfaG9tZSgpfS9naXRgLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblx0YXdhaXQgZnMud3JpdGVGaWxlKGAke3hkZ19jb25maWdfaG9tZSgpfS9naXQvY3JlZGVudGlhbHNgLCBjcmVkZW50aWFscywgeyBmbGFnOiAnYScsIG1vZGU6IDBvNjAwIH0pO1xuXG5cdC8vIEFkZCBnaXQgY29uZmlndXJhdGlvbi5cblx0YXdhaXQgZXhlYygnZ2l0JywgWydjb25maWcnLCAnLS1nbG9iYWwnLCAnY3JlZGVudGlhbC5oZWxwZXInLCAnc3RvcmUnXSk7XG5cdGF3YWl0IGV4ZWMoJ2dpdCcsIFsnY29uZmlnJywgJy0tZ2xvYmFsJywgJy0tdW5zZXQtYWxsJywgJ3VybC5odHRwczovL2dpdGh1Yi5jb20vLmluc3RlYWRPZiddKTtcblx0YXdhaXQgZXhlYygnZ2l0JywgWydjb25maWcnLCAnLS1nbG9iYWwnLCAgICAgICAgICAndXJsLmh0dHBzOi8vZ2l0aHViLmNvbS8uaW5zdGVhZE9mJywgJ3NzaDovL2dpdEBnaXRodWIuY29tLyddKTtcblx0YXdhaXQgZXhlYygnZ2l0JywgWydjb25maWcnLCAnLS1nbG9iYWwnLCAnLS1hZGQnLCAndXJsLmh0dHBzOi8vZ2l0aHViLmNvbS8uaW5zdGVhZE9mJywgJ2dpdEBnaXRodWIuY29tOiddKTtcbn1cblxucnVuKCkuY2F0Y2goZXJyb3IgPT4ge1xuXHRjb3JlLnNldEZhaWxlZChlcnJvci5tZXNzYWdlKTtcbn0pO1xuIl19