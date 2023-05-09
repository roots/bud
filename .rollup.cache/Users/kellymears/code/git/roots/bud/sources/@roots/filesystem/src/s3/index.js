import { __decorate, __metadata } from "tslib";
import { bind } from 'helpful-decorators';
import isString from 'lodash/isString.js';
import * as mimetypes from 'mime-types';
import { Client } from './client.js';
import { Config } from './config.js';
/**
 * S3 API
 */
export class S3 {
    /**
     * constructor
     */
    constructor() {
        this.config = new Config();
        this.client = new Client();
    }
    /**
     * S3 Client
     */
    async getClient() {
        if (!this.config.credentials) {
            throw new Error(`S3 credentials are required. Did you forget to set them?`);
        }
        return await this.client.make({
            credentials: this.config.credentials,
            region: this.config.region,
            ...(this.config.endpoint ? { endpoint: this.config.endpoint } : {}),
        });
    }
    /**
     * Identifier (for loggers, etc)
     */
    get ident() {
        const maybeEndpoint = this.config.get(`endpoint`);
        if (!maybeEndpoint)
            return `${this.config.get(`bucket`)} (${this.config.get(`region`)})`;
        if (isString(maybeEndpoint) &&
            maybeEndpoint.includes(`digitaloceanspaces`))
            return `https://${this.config.get(`bucket`)}.${new URL(maybeEndpoint).hostname}`;
        return `https://${maybeEndpoint.toString()}`;
    }
    /**
     * Read a file from s3
     *
     * @remarks
     * By default the raw response will be buffered to `utf8` before being returned. This can be
     * disabled by setting `raw` to `true`.
     *
     * @param key - The file key
     * @param raw - Whether to return raw response
     * @returns The file contents
     * @throws Error - If the file does not exist
     */
    async read(key, raw = false) {
        const streamToString = ({ Body: stream }) => new Promise((resolve, reject) => {
            const chunks = [];
            stream
                .on(`data`, chunk => chunks.push(chunk))
                .on(`error`, reject)
                .on(`end`, () => resolve(Buffer.concat(chunks).toString(`utf8`)));
        });
        const client = await this.getClient();
        const GetObjectCommandOutput = await import(`@aws-sdk/client-s3`).then(({ GetObjectCommand }) => new GetObjectCommand({ Bucket: this.config.bucket, Key: key }));
        try {
            const request = (await client.send(GetObjectCommandOutput));
            return raw ? request : streamToString(request);
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Delete a file from s3
     *
     * @param key - The file key
     * @returns S3 instance {@link S3}
     * @throws Error - If the file does not exist
     * @throws Error - If the file could not be deleted
     */
    async delete(key) {
        try {
            const client = await this.getClient();
            const DeleteObjectOutput = await import(`@aws-sdk/client-s3`).then(({ DeleteObjectCommand }) => new DeleteObjectCommand({
                Bucket: this.config.bucket,
                Key: key,
            }));
            await client.send(DeleteObjectOutput);
            return this;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Check if file exists in bucket
     *
     * @param key - The file key
     * @returns boolean
     */
    async exists(key) {
        try {
            const files = (await this.list());
            return files.some(item => item === key);
        }
        catch (error) {
            return false;
        }
    }
    /**
     * List all files in bucket
     *
     * @remarks
     * By default the {@link ListObjectsCommandOutput} will be mapped so that the returned value is an array of file keys.
     * This can be disabled by setting `raw` to `true`.
     *
     * @param props - {@link Omit<ListObjectsCommandInput, `Bucket`> command input props}
     * @returns Array of file keys
     */
    async list(props) {
        try {
            const client = await this.getClient();
            const s3 = await import(`@aws-sdk/client-s3`);
            const command = new s3.ListObjectsCommand({
                Bucket: this.config.bucket,
                ...(props ?? {}),
            });
            const results = await client.send(command);
            return results?.Contents.map(({ Key }) => Key);
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Write a file to s3
     *
     * @param params - Either {@link PutObjectCommandInput} or the key and body
     * @returns S3 instance {@link S3}
     */
    async write(...params) {
        const putProps = {
            Bucket: this.config.bucket,
            ACL: this.config.public ? `public-read` : `private`,
            Key: null,
            ContentType: null,
        };
        if (typeof params[0] !== `string`)
            Object.assign(putProps, params[0]);
        else
            Object.assign(putProps, { Key: params[0], Body: params[1] });
        if (!putProps.Key)
            throw new Error(`S3 write requires a key`);
        if (!putProps.ContentType) {
            const contentType = mimetypes.lookup(putProps.Key);
            if (!contentType)
                return;
            putProps.ContentType = contentType;
        }
        try {
            const client = await this.getClient();
            const { PutObjectCommand } = await import(`@aws-sdk/client-s3`);
            await client.send(new PutObjectCommand(putProps));
            return this;
        }
        catch (error) {
            throw error;
        }
    }
}
__decorate([
    bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], S3.prototype, "getClient", null);
__decorate([
    bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], S3.prototype, "read", null);
__decorate([
    bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], S3.prototype, "delete", null);
__decorate([
    bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], S3.prototype, "exists", null);
__decorate([
    bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], S3.prototype, "list", null);
__decorate([
    bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], S3.prototype, "write", null);
//# sourceMappingURL=index.js.map