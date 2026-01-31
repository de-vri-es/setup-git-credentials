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
            yield file.write("\n");
        }
        // Track the credentials we're adding for cleanup
        const addedCredentials = [];
        // Add credentials that aren't already in the file.
        for (const credential of new_credentials) {
            yield file.write(credential + "\n");
            addedCredentials.push(credential);
        }
        // Flush to disk before close - prevents race condition with git
        yield file.sync();
        yield file.close();
        // Store the added credentials for post-cleanup
        core.saveState('added-credentials', JSON.stringify(addedCredentials));
        // Add git configuration.
        yield (0, exec_1.exec)('git', ['config', '--global', 'credential.helper', 'store']);
        yield (0, exec_1.exec)('git', ['config', '--global', '--replace-all', 'url.https://github.com/.insteadOf', 'ssh://git@github.com/']);
        yield (0, exec_1.exec)('git', ['config', '--global', '--add', 'url.https://github.com/.insteadOf', 'git@github.com:']);
    });
}
run().catch(error => {
    core.setFailed(error.message);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBc0M7QUFDdEMsd0NBQXFDO0FBRXJDLDJCQUFvQztBQUNwQyxpREFBbUM7QUFDbkMsdUNBQXlCO0FBRXpCLFNBQVMsZUFBZTtJQUN2QixNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkQsSUFBSSxlQUFlO1FBQUUsT0FBTyxlQUFlLENBQUM7SUFDNUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFBO0FBQ2pDLENBQUM7QUFFRCxTQUFTLHVCQUF1QixDQUFDLEtBQWE7SUFDN0MsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUN6QixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRUQsU0FBZSxHQUFHOztRQUNqQixNQUFNLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFOUYsaUVBQWlFO1FBQ2pFLG1IQUFtSDtRQUNuSCxNQUFNLGFBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxlQUFlLEVBQUUsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDaEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxhQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsZUFBZSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoRixNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEQsTUFBTSxlQUFlLEdBQUcsdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUQsTUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRXRGLGtEQUFrRDtRQUNsRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3JELE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBRUQsaURBQWlEO1FBQ2pELE1BQU0sZ0JBQWdCLEdBQWEsRUFBRSxDQUFDO1FBRXRDLG1EQUFtRDtRQUNuRCxLQUFLLE1BQU0sVUFBVSxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDcEMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCxnRUFBZ0U7UUFDaEUsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEIsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFbkIsK0NBQStDO1FBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFFdEUseUJBQXlCO1FBQ3pCLE1BQU0sSUFBQSxXQUFJLEVBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sSUFBQSxXQUFJLEVBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsbUNBQW1DLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1FBQ3pILE1BQU0sSUFBQSxXQUFJLEVBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzVHLENBQUM7Q0FBQTtBQUVELEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtJQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvcmUgZnJvbSAnQGFjdGlvbnMvY29yZSc7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSAnQGFjdGlvbnMvZXhlYyc7XG5cbmltcG9ydCB7IHByb21pc2VzIGFzIGZzIH0gZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcHJvY2VzcyBmcm9tICdwcm9jZXNzJztcbmltcG9ydCAqIGFzIG9zIGZyb20gJ29zJztcblxuZnVuY3Rpb24geGRnX2NvbmZpZ19ob21lKCkge1xuXHRjb25zdCB4ZGdfY29uZmlnX2hvbWUgPSBwcm9jZXNzLmVudlsnWERHX0NPTkZJR19IT01FJ107XG5cdGlmICh4ZGdfY29uZmlnX2hvbWUpIHJldHVybiB4ZGdfY29uZmlnX2hvbWU7XG5cdHJldHVybiBgJHtvcy5ob21lZGlyKCl9Ly5jb25maWdgXG59XG5cbmZ1bmN0aW9uIG5vbl9lbXB0eV90cmltbWVkX2xpbmVzKGlucHV0OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG5cdHJldHVybiBpbnB1dC5zcGxpdCgvXFxyP1xcbi8pXG5cdFx0Lm1hcChsaW5lID0+IGxpbmUudHJpbSgpKVxuXHRcdC5maWx0ZXIobGluZSA9PiBsaW5lLmxlbmd0aCA+IDApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW4oKSB7XG5cdGNvbnN0IGNyZWRlbnRpYWxzID0gbm9uX2VtcHR5X3RyaW1tZWRfbGluZXMoY29yZS5nZXRJbnB1dCgnY3JlZGVudGlhbHMnLCB7IHJlcXVpcmVkOiB0cnVlIH0pKTtcblxuXHQvLyBHZXQgdGhlIGN1cnJlbnQgY3JlZGVudGlhbHMgc28gd2UgY2FuIGF2b2lkIGFkZGluZyBkdXBsaWNhdGVzLlxuXHQvLyBPbiBzZWxmLWhvc3RlZCBydW5uZXJzLCB0aGUgY3JlZGVudGlhbHMgZmlsZSBjb3VsZCBiZSByZXRhaW5lZCBiZXR3ZWVuIHJ1bnMsIHNvIHdlIGRvbid0IHdhbnQgdG8gYWRkIGR1cGxpY2F0ZXMuXG5cdGF3YWl0IGZzLm1rZGlyKGAke3hkZ19jb25maWdfaG9tZSgpfS9naXRgLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblx0Y29uc3QgZmlsZSA9IGF3YWl0IGZzLm9wZW4oYCR7eGRnX2NvbmZpZ19ob21lKCl9L2dpdC9jcmVkZW50aWFsc2AsIFwiYStcIiwgMG82MDApO1xuXHRjb25zdCBjb250ZW50cyA9IChhd2FpdCBmaWxlLnJlYWRGaWxlKCkpLnRvU3RyaW5nKCk7XG5cdGNvbnN0IG9sZF9jcmVkZW50aWFscyA9IG5vbl9lbXB0eV90cmltbWVkX2xpbmVzKGNvbnRlbnRzKTtcblx0Y29uc3QgbmV3X2NyZWRlbnRpYWxzID0gY3JlZGVudGlhbHMuZmlsdGVyKGVudHJ5ID0+ICFvbGRfY3JlZGVudGlhbHMuaW5jbHVkZXMoZW50cnkpKTtcblxuXHQvLyBJZiB0aGUgZmlsZSBkaWRuJ3QgZW5kIHdpdGggYSBuZXdsaW5lLCBhZGQgb25lLlxuXHRpZiAoY29udGVudHMubGVuZ3RoID4gMCAmJiAhY29udGVudHMuZW5kc1dpdGgoXCJcXG5cIikpIHtcblx0XHRhd2FpdCBmaWxlLndyaXRlKFwiXFxuXCIpO1xuXHR9XG5cblx0Ly8gVHJhY2sgdGhlIGNyZWRlbnRpYWxzIHdlJ3JlIGFkZGluZyBmb3IgY2xlYW51cFxuXHRjb25zdCBhZGRlZENyZWRlbnRpYWxzOiBzdHJpbmdbXSA9IFtdO1xuXG5cdC8vIEFkZCBjcmVkZW50aWFscyB0aGF0IGFyZW4ndCBhbHJlYWR5IGluIHRoZSBmaWxlLlxuXHRmb3IgKGNvbnN0IGNyZWRlbnRpYWwgb2YgbmV3X2NyZWRlbnRpYWxzKSB7XG5cdFx0YXdhaXQgZmlsZS53cml0ZShjcmVkZW50aWFsICsgXCJcXG5cIik7XG5cdFx0YWRkZWRDcmVkZW50aWFscy5wdXNoKGNyZWRlbnRpYWwpO1xuXHR9XG5cblx0Ly8gRmx1c2ggdG8gZGlzayBiZWZvcmUgY2xvc2UgLSBwcmV2ZW50cyByYWNlIGNvbmRpdGlvbiB3aXRoIGdpdFxuXHRhd2FpdCBmaWxlLnN5bmMoKTtcblx0YXdhaXQgZmlsZS5jbG9zZSgpO1xuXG5cdC8vIFN0b3JlIHRoZSBhZGRlZCBjcmVkZW50aWFscyBmb3IgcG9zdC1jbGVhbnVwXG5cdGNvcmUuc2F2ZVN0YXRlKCdhZGRlZC1jcmVkZW50aWFscycsIEpTT04uc3RyaW5naWZ5KGFkZGVkQ3JlZGVudGlhbHMpKTtcblxuXHQvLyBBZGQgZ2l0IGNvbmZpZ3VyYXRpb24uXG5cdGF3YWl0IGV4ZWMoJ2dpdCcsIFsnY29uZmlnJywgJy0tZ2xvYmFsJywgJ2NyZWRlbnRpYWwuaGVscGVyJywgJ3N0b3JlJ10pO1xuXHRhd2FpdCBleGVjKCdnaXQnLCBbJ2NvbmZpZycsICctLWdsb2JhbCcsICctLXJlcGxhY2UtYWxsJywgJ3VybC5odHRwczovL2dpdGh1Yi5jb20vLmluc3RlYWRPZicsICdzc2g6Ly9naXRAZ2l0aHViLmNvbS8nXSk7XG5cdGF3YWl0IGV4ZWMoJ2dpdCcsIFsnY29uZmlnJywgJy0tZ2xvYmFsJywgJy0tYWRkJywgJ3VybC5odHRwczovL2dpdGh1Yi5jb20vLmluc3RlYWRPZicsICdnaXRAZ2l0aHViLmNvbTonXSk7XG59XG5cbnJ1bigpLmNhdGNoKGVycm9yID0+IHtcblx0Y29yZS5zZXRGYWlsZWQoZXJyb3IubWVzc2FnZSk7XG59KTtcbiJdfQ==