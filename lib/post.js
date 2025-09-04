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
function cleanup() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const addedCredentials = core.getState('added-credentials');
            if (!addedCredentials) {
                core.info('No credentials were added to clean up');
                return;
            }
            const credentialsToRemove = JSON.parse(addedCredentials);
            if (credentialsToRemove.length === 0) {
                core.info('No credentials to remove');
                return;
            }
            const credentialsPath = `${xdg_config_home()}/git/credentials`;
            // Check if the credentials file exists
            try {
                yield fs_1.promises.access(credentialsPath);
            }
            catch (_a) {
                core.info('Credentials file does not exist, nothing to clean up');
                return;
            }
            // Read the current file contents
            const contents = (yield fs_1.promises.readFile(credentialsPath)).toString();
            const currentLines = non_empty_trimmed_lines(contents);
            // Remove the credentials that were added by this action
            const filteredLines = currentLines.filter(line => !credentialsToRemove.includes(line));
            // Write back the filtered content
            if (filteredLines.length > 0) {
                yield fs_1.promises.writeFile(credentialsPath, filteredLines.join('\n') + '\n', { mode: 0o600 });
                core.info(`Removed ${credentialsToRemove.length} credential(s) from git credentials file`);
            }
            else {
                // If no credentials remain, remove the file
                yield fs_1.promises.unlink(credentialsPath);
                core.info('Removed empty git credentials file');
            }
            core.info('Git credentials cleanup completed');
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            core.warning(`Failed to clean up git credentials: ${errorMessage}`);
        }
    });
}
cleanup();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBc0M7QUFDdEMsMkJBQW9DO0FBQ3BDLGlEQUFtQztBQUNuQyx1Q0FBeUI7QUFFekIsU0FBUyxlQUFlO0lBQ3ZCLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2RCxJQUFJLGVBQWU7UUFBRSxPQUFPLGVBQWUsQ0FBQztJQUM1QyxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7QUFDbEMsQ0FBQztBQUVELFNBQVMsdUJBQXVCLENBQUMsS0FBYTtJQUM3QyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQ3pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFFRCxTQUFlLE9BQU87O1FBQ3JCLElBQUksQ0FBQztZQUNKLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLENBQUM7Z0JBQ25ELE9BQU87WUFDUixDQUFDO1lBRUQsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFhLENBQUM7WUFDckUsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztnQkFDdEMsT0FBTztZQUNSLENBQUM7WUFFRCxNQUFNLGVBQWUsR0FBRyxHQUFHLGVBQWUsRUFBRSxrQkFBa0IsQ0FBQztZQUUvRCx1Q0FBdUM7WUFDdkMsSUFBSSxDQUFDO2dCQUNKLE1BQU0sYUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNsQyxDQUFDO1lBQUMsV0FBTSxDQUFDO2dCQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsc0RBQXNELENBQUMsQ0FBQztnQkFDbEUsT0FBTztZQUNSLENBQUM7WUFFRCxpQ0FBaUM7WUFDakMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLGFBQUUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqRSxNQUFNLFlBQVksR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV2RCx3REFBd0Q7WUFDeEQsTUFBTSxhQUFhLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFdkYsa0NBQWtDO1lBQ2xDLElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDOUIsTUFBTSxhQUFFLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsbUJBQW1CLENBQUMsTUFBTSwwQ0FBMEMsQ0FBQyxDQUFDO1lBQzVGLENBQUM7aUJBQU0sQ0FBQztnQkFDUCw0Q0FBNEM7Z0JBQzVDLE1BQU0sYUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lBQ2pELENBQUM7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDaEIsTUFBTSxZQUFZLEdBQUcsS0FBSyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVFLElBQUksQ0FBQyxPQUFPLENBQUMsdUNBQXVDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDckUsQ0FBQztJQUNGLENBQUM7Q0FBQTtBQUVELE9BQU8sRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29yZSBmcm9tICdAYWN0aW9ucy9jb3JlJztcbmltcG9ydCB7IHByb21pc2VzIGFzIGZzIH0gZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcHJvY2VzcyBmcm9tICdwcm9jZXNzJztcbmltcG9ydCAqIGFzIG9zIGZyb20gJ29zJztcblxuZnVuY3Rpb24geGRnX2NvbmZpZ19ob21lKCkge1xuXHRjb25zdCB4ZGdfY29uZmlnX2hvbWUgPSBwcm9jZXNzLmVudlsnWERHX0NPTkZJR19IT01FJ107XG5cdGlmICh4ZGdfY29uZmlnX2hvbWUpIHJldHVybiB4ZGdfY29uZmlnX2hvbWU7XG5cdHJldHVybiBgJHtvcy5ob21lZGlyKCl9Ly5jb25maWdgO1xufVxuXG5mdW5jdGlvbiBub25fZW1wdHlfdHJpbW1lZF9saW5lcyhpbnB1dDogc3RyaW5nKTogc3RyaW5nW10ge1xuXHRyZXR1cm4gaW5wdXQuc3BsaXQoL1xccj9cXG4vKVxuXHRcdC5tYXAobGluZSA9PiBsaW5lLnRyaW0oKSlcblx0XHQuZmlsdGVyKGxpbmUgPT4gbGluZS5sZW5ndGggPiAwKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xlYW51cCgpIHtcblx0dHJ5IHtcblx0XHRjb25zdCBhZGRlZENyZWRlbnRpYWxzID0gY29yZS5nZXRTdGF0ZSgnYWRkZWQtY3JlZGVudGlhbHMnKTtcblx0XHRpZiAoIWFkZGVkQ3JlZGVudGlhbHMpIHtcblx0XHRcdGNvcmUuaW5mbygnTm8gY3JlZGVudGlhbHMgd2VyZSBhZGRlZCB0byBjbGVhbiB1cCcpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGNyZWRlbnRpYWxzVG9SZW1vdmUgPSBKU09OLnBhcnNlKGFkZGVkQ3JlZGVudGlhbHMpIGFzIHN0cmluZ1tdO1xuXHRcdGlmIChjcmVkZW50aWFsc1RvUmVtb3ZlLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0Y29yZS5pbmZvKCdObyBjcmVkZW50aWFscyB0byByZW1vdmUnKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBjcmVkZW50aWFsc1BhdGggPSBgJHt4ZGdfY29uZmlnX2hvbWUoKX0vZ2l0L2NyZWRlbnRpYWxzYDtcblx0XHRcblx0XHQvLyBDaGVjayBpZiB0aGUgY3JlZGVudGlhbHMgZmlsZSBleGlzdHNcblx0XHR0cnkge1xuXHRcdFx0YXdhaXQgZnMuYWNjZXNzKGNyZWRlbnRpYWxzUGF0aCk7XG5cdFx0fSBjYXRjaCB7XG5cdFx0XHRjb3JlLmluZm8oJ0NyZWRlbnRpYWxzIGZpbGUgZG9lcyBub3QgZXhpc3QsIG5vdGhpbmcgdG8gY2xlYW4gdXAnKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBSZWFkIHRoZSBjdXJyZW50IGZpbGUgY29udGVudHNcblx0XHRjb25zdCBjb250ZW50cyA9IChhd2FpdCBmcy5yZWFkRmlsZShjcmVkZW50aWFsc1BhdGgpKS50b1N0cmluZygpO1xuXHRcdGNvbnN0IGN1cnJlbnRMaW5lcyA9IG5vbl9lbXB0eV90cmltbWVkX2xpbmVzKGNvbnRlbnRzKTtcblx0XHRcblx0XHQvLyBSZW1vdmUgdGhlIGNyZWRlbnRpYWxzIHRoYXQgd2VyZSBhZGRlZCBieSB0aGlzIGFjdGlvblxuXHRcdGNvbnN0IGZpbHRlcmVkTGluZXMgPSBjdXJyZW50TGluZXMuZmlsdGVyKGxpbmUgPT4gIWNyZWRlbnRpYWxzVG9SZW1vdmUuaW5jbHVkZXMobGluZSkpO1xuXHRcdFxuXHRcdC8vIFdyaXRlIGJhY2sgdGhlIGZpbHRlcmVkIGNvbnRlbnRcblx0XHRpZiAoZmlsdGVyZWRMaW5lcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRhd2FpdCBmcy53cml0ZUZpbGUoY3JlZGVudGlhbHNQYXRoLCBmaWx0ZXJlZExpbmVzLmpvaW4oJ1xcbicpICsgJ1xcbicsIHsgbW9kZTogMG82MDAgfSk7XG5cdFx0XHRjb3JlLmluZm8oYFJlbW92ZWQgJHtjcmVkZW50aWFsc1RvUmVtb3ZlLmxlbmd0aH0gY3JlZGVudGlhbChzKSBmcm9tIGdpdCBjcmVkZW50aWFscyBmaWxlYCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIElmIG5vIGNyZWRlbnRpYWxzIHJlbWFpbiwgcmVtb3ZlIHRoZSBmaWxlXG5cdFx0XHRhd2FpdCBmcy51bmxpbmsoY3JlZGVudGlhbHNQYXRoKTtcblx0XHRcdGNvcmUuaW5mbygnUmVtb3ZlZCBlbXB0eSBnaXQgY3JlZGVudGlhbHMgZmlsZScpO1xuXHRcdH1cblx0XHRcblx0XHRjb3JlLmluZm8oJ0dpdCBjcmVkZW50aWFscyBjbGVhbnVwIGNvbXBsZXRlZCcpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcblx0XHRjb3JlLndhcm5pbmcoYEZhaWxlZCB0byBjbGVhbiB1cCBnaXQgY3JlZGVudGlhbHM6ICR7ZXJyb3JNZXNzYWdlfWApO1xuXHR9XG59XG5cbmNsZWFudXAoKTtcbiJdfQ==