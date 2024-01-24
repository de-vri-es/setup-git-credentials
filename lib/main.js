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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBc0M7QUFDdEMsd0NBQXFDO0FBRXJDLDJCQUFvQztBQUNwQyxpREFBbUM7QUFDbkMsdUNBQXlCO0FBRXpCLFNBQVMsZUFBZTtJQUN2QixNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkQsSUFBSSxlQUFlO1FBQUUsT0FBTyxlQUFlLENBQUM7SUFDNUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFBO0FBQ2pDLENBQUM7QUFFRCxTQUFTLHVCQUF1QixDQUFDLEtBQWE7SUFDN0MsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUN6QixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRUQsU0FBZSxHQUFHOztRQUNqQixNQUFNLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFOUYsaUVBQWlFO1FBQ2pFLG1IQUFtSDtRQUNuSCxNQUFNLGFBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxlQUFlLEVBQUUsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDaEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxhQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsZUFBZSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoRixNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEQsTUFBTSxlQUFlLEdBQUcsdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUQsTUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRXRGLGtEQUFrRDtRQUNsRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQztRQUVELG1EQUFtRDtRQUNuRCxLQUFLLE1BQU0sVUFBVSxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUVELHlCQUF5QjtRQUN6QixNQUFNLElBQUEsV0FBSSxFQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN4RSxNQUFNLElBQUEsV0FBSSxFQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLG1DQUFtQyxFQUFFLHVCQUF1QixDQUFDLENBQUMsQ0FBQztRQUN6SCxNQUFNLElBQUEsV0FBSSxFQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUM1RyxDQUFDO0NBQUE7QUFFRCxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb3JlIGZyb20gJ0BhY3Rpb25zL2NvcmUnO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ0BhY3Rpb25zL2V4ZWMnO1xuXG5pbXBvcnQgeyBwcm9taXNlcyBhcyBmcyB9IGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHByb2Nlc3MgZnJvbSAncHJvY2Vzcyc7XG5pbXBvcnQgKiBhcyBvcyBmcm9tICdvcyc7XG5cbmZ1bmN0aW9uIHhkZ19jb25maWdfaG9tZSgpIHtcblx0Y29uc3QgeGRnX2NvbmZpZ19ob21lID0gcHJvY2Vzcy5lbnZbJ1hER19DT05GSUdfSE9NRSddO1xuXHRpZiAoeGRnX2NvbmZpZ19ob21lKSByZXR1cm4geGRnX2NvbmZpZ19ob21lO1xuXHRyZXR1cm4gYCR7b3MuaG9tZWRpcigpfS8uY29uZmlnYFxufVxuXG5mdW5jdGlvbiBub25fZW1wdHlfdHJpbW1lZF9saW5lcyhpbnB1dDogc3RyaW5nKTogc3RyaW5nW10ge1xuXHRyZXR1cm4gaW5wdXQuc3BsaXQoL1xccj9cXG4vKVxuXHRcdC5tYXAobGluZSA9PiBsaW5lLnRyaW0oKSlcblx0XHQuZmlsdGVyKGxpbmUgPT4gbGluZS5sZW5ndGggPiAwKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcnVuKCkge1xuXHRjb25zdCBjcmVkZW50aWFscyA9IG5vbl9lbXB0eV90cmltbWVkX2xpbmVzKGNvcmUuZ2V0SW5wdXQoJ2NyZWRlbnRpYWxzJywgeyByZXF1aXJlZDogdHJ1ZSB9KSk7XG5cblx0Ly8gR2V0IHRoZSBjdXJyZW50IGNyZWRlbnRpYWxzIHNvIHdlIGNhbiBhdm9pZCBhZGRpbmcgZHVwbGljYXRlcy5cblx0Ly8gT24gc2VsZi1ob3N0ZWQgcnVubmVycywgdGhlIGNyZWRlbnRpYWxzIGZpbGUgY291bGQgYmUgcmV0YWluZWQgYmV0d2VlbiBydW5zLCBzbyB3ZSBkb24ndCB3YW50IHRvIGFkZCBkdXBsaWNhdGVzLlxuXHRhd2FpdCBmcy5ta2RpcihgJHt4ZGdfY29uZmlnX2hvbWUoKX0vZ2l0YCwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cdGNvbnN0IGZpbGUgPSBhd2FpdCBmcy5vcGVuKGAke3hkZ19jb25maWdfaG9tZSgpfS9naXQvY3JlZGVudGlhbHNgLCBcImErXCIsIDBvNjAwKTtcblx0Y29uc3QgY29udGVudHMgPSAoYXdhaXQgZmlsZS5yZWFkRmlsZSgpKS50b1N0cmluZygpO1xuXHRjb25zdCBvbGRfY3JlZGVudGlhbHMgPSBub25fZW1wdHlfdHJpbW1lZF9saW5lcyhjb250ZW50cyk7XG5cdGNvbnN0IG5ld19jcmVkZW50aWFscyA9IGNyZWRlbnRpYWxzLmZpbHRlcihlbnRyeSA9PiAhb2xkX2NyZWRlbnRpYWxzLmluY2x1ZGVzKGVudHJ5KSk7XG5cblx0Ly8gSWYgdGhlIGZpbGUgZGlkbid0IGVuZCB3aXRoIGEgbmV3bGluZSwgYWRkIG9uZS5cblx0aWYgKGNvbnRlbnRzLmxlbmd0aCA+IDAgJiYgIWNvbnRlbnRzLmVuZHNXaXRoKFwiXFxuXCIpKSB7XG5cdFx0ZmlsZS53cml0ZShcIlxcblwiKTtcblx0fVxuXG5cdC8vIEFkZCBjcmVkZW50aWFscyB0aGF0IGFyZW4ndCBhbHJlYWR5IGluIHRoZSBmaWxlLlxuXHRmb3IgKGNvbnN0IGNyZWRlbnRpYWwgb2YgbmV3X2NyZWRlbnRpYWxzKSB7XG5cdFx0YXdhaXQgZmlsZS53cml0ZShjcmVkZW50aWFsICsgXCJcXG5cIik7XG5cdH1cblxuXHQvLyBBZGQgZ2l0IGNvbmZpZ3VyYXRpb24uXG5cdGF3YWl0IGV4ZWMoJ2dpdCcsIFsnY29uZmlnJywgJy0tZ2xvYmFsJywgJ2NyZWRlbnRpYWwuaGVscGVyJywgJ3N0b3JlJ10pO1xuXHRhd2FpdCBleGVjKCdnaXQnLCBbJ2NvbmZpZycsICctLWdsb2JhbCcsICctLXJlcGxhY2UtYWxsJywgJ3VybC5odHRwczovL2dpdGh1Yi5jb20vLmluc3RlYWRPZicsICdzc2g6Ly9naXRAZ2l0aHViLmNvbS8nXSk7XG5cdGF3YWl0IGV4ZWMoJ2dpdCcsIFsnY29uZmlnJywgJy0tZ2xvYmFsJywgJy0tYWRkJywgJ3VybC5odHRwczovL2dpdGh1Yi5jb20vLmluc3RlYWRPZicsICdnaXRAZ2l0aHViLmNvbTonXSk7XG59XG5cbnJ1bigpLmNhdGNoKGVycm9yID0+IHtcblx0Y29yZS5zZXRGYWlsZWQoZXJyb3IubWVzc2FnZSk7XG59KTtcbiJdfQ==