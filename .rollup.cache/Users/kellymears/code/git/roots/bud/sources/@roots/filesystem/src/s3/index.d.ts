/// <reference types="node" />
import type { Readable } from 'node:stream';
import type { GetObjectOutput, ListObjectsCommandInput, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { Client } from './client.js';
import { Config } from './config.js';
/**
 * S3 API
 */
export declare class S3 {
    config: Config;
    client: Client;
    /**
     * constructor
     */
    constructor();
    /**
     * S3 Client
     */
    getClient(): Promise<S3Client>;
    /**
     * Identifier (for loggers, etc)
     */
    get ident(): string;
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
    read(key: string, raw?: boolean): Promise<GetObjectOutput | string>;
    /**
     * Delete a file from s3
     *
     * @param key - The file key
     * @returns S3 instance {@link S3}
     * @throws Error - If the file does not exist
     * @throws Error - If the file could not be deleted
     */
    delete(key: string): Promise<this>;
    /**
     * Check if file exists in bucket
     *
     * @param key - The file key
     * @returns boolean
     */
    exists(key: string): Promise<boolean>;
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
    list(props?: Omit<ListObjectsCommandInput, `Bucket`>): Promise<Array<string>>;
    /**
     * Write a file to s3
     *
     * @param params - Either {@link PutObjectCommandInput} or the key and body
     * @returns S3 instance {@link S3}
     */
    write(...params: [Omit<PutObjectCommandInput, `Bucket`>] | [string, Readable | ReadableStream | Blob | string]): Promise<this>;
}
//# sourceMappingURL=index.d.ts.map