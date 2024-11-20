<?php

namespace App\Http\Controllers;

use App\Events\NotificationPusherEvent;
use App\Events\SendEmailEvent;
use App\Models\EmailTemplate;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Str;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function formatSizeUnits($bytes)
    {
        if ($bytes >= 1073741824) {
            $bytes = number_format($bytes / 1073741824, 2) . ' GB';
        } elseif ($bytes >= 1048576) {
            $bytes = number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            $bytes = number_format($bytes / 1024, 2) . ' KB';
        } elseif ($bytes > 1) {
            $bytes = $bytes . ' bytes';
        } elseif ($bytes == 1) {
            $bytes = $bytes . ' byte';
        } else {
            $bytes = '0 bytes';
        }

        return $bytes;
    }

    public function create_attachment($model, $file, $option = [])
    {
        if (!empty($option['folder_name'])) {
            $action = !empty($option['action']) ? $option['action'] : "";
            // $id = !empty($option['id']) ? $option['id'] : "";
            $folder_name = !empty($option['folder_name']) ? $option['folder_name'] : null;
            $file_description = !empty($option['file_description']) ? $option['file_description'] : null;
            $file_type = !empty($option['file_type']) ? $option['file_type'] : 'image';
            // $created_by = !empty($option['created_by']) ? $option['created_by'] : null;

            //if ($action == 'Add') {
            $fileName = $file->getClientOriginalName();
            $filePath = Str::random(10) . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs($folder_name, $filePath, 'public');
            $fileSize = $this->formatSizeUnits($file->getSize());

            $model->attachments()->create([
                'file_name' => $fileName,
                'file_path' => "storage/" . $filePath,
                'file_size' => $fileSize,
                'file_description' => $file_description,
                'file_type' => $file_type,
                // 'created_by' => $created_by
            ]);
            //}

            return true;
        } else {
            return false;
        }
    }

    public function pusher_notification($message)
    {
        event(new NotificationPusherEvent($message));
    }

    public function send_email($options)
    {
        // local testing
        // php artisan queue:work

        $title = array_key_exists("title", $options) ? $options["title"] : "";
        $system_id = array_key_exists("system_id", $options) ? $options["system_id"] : "";


        $to_name = array_key_exists("to_name", $options) ? $options["to_name"] : "";
        $to_email = array_key_exists("to_email", $options) ? $options["to_email"] : "";


        $from_name = array_key_exists("from_name", $options) ? $options["from_name"] : env("APP_NAME");
        $from_email = array_key_exists("from_email", $options) ? $options["from_email"] : "";
        $link = array_key_exists("link", $options) ? $options["link"] : "";
        $link_name = array_key_exists("link_name", $options) ? $options["link_name"] : "";
        $code = array_key_exists("code", $options) ? $options["code"] : "";

        $fullname = array_key_exists("fullname", $options) ? $options["fullname"] : "";

        $template = array_key_exists("template", $options) ? $options["template"] : "emails.email-template";
        $position = array_key_exists("position", $options) ? $options["position"] : "position";

        $new_link = '<a href="' . $link . '" target="_blank"
        style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, "helvetica neue", helvetica, arial, sans-serif;font-size:18px;color:#333333;border-style:solid;border-color:#FEC300;border-width:10px 20px;display:inline-block;background:#FEC300;border-radius:4px;font-weight:bold;font-style:normal;line-height:22px;width:auto;text-align:center;">' . $link_name . '</a>';


        if ($title && $system_id) {
            $email_template = EmailTemplate::where("title", $title)->where("system_id", $system_id)->first();
            if ($email_template) {
                $subject = $email_template->subject;
                $body = $email_template->body;

                if ($subject) {
                    $subject = str_replace('[user:full-name]', $fullname, $subject); //sample
                }

                if ($body) {

                    if ($to_name) {
                        $body = str_replace('[USER:FULLNAME]', $to_name, $body);
                    }

                    if ($to_email) {
                        $body = str_replace('[user:email]', $to_email, $body);
                        $body = str_replace('[USER:EMAIL-FROM]', $to_email, $body);
                    }

                    if ($new_link) {
                        $body = str_replace('[site:set-password-url]', $new_link, $body);
                    }

                    if ($from_name) {
                        $body = str_replace('[USER:FULLNAME-FROM]', $from_name, $body);
                        $body = str_replace('[user:from_name]', $from_name, $body);
                    }

                    if ($position) {
                        $body = str_replace('[USER:POSITION]', $position, $body);
                    }
                }

                // footer signature
                $data_email = [
                    'to_name'       => $to_name,
                    'to_email'      => $to_email,
                    'subject'       => $subject,
                    'from_name'     => $from_name,
                    'from_email'    => $from_email,
                    'template'      => $template,
                    'body_data'     => [
                        "content" => $body,
                    ]
                ];

                event(new SendEmailEvent($data_email));

                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
