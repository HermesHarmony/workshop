<?php
return function($kirby, $pages, $page, $site) {

    $alert = null;

    if($kirby->request()->is('POST') && get('submit')) {

        // check the honeypot
        if(empty(get('website')) === false) {
            go($page->url());
            exit;
        }

        $data = [];

        foreach ($_POST as $key => $value) {
            if($key !== 'submit' && $key !== 'form' && $value !== '' && $key !== 'privacy') {
                if(is_array($value)) {
                    $data[strtolower($key)] = implode(', ', $value);
                } else {
                    $data[strtolower($key)] = $value;
                }
            }
        }

        // check the honeypot
        if(empty($data['website']) === false) {
            go($page->url());
            exit;
        }
        
        $form = page(get('form'));
        $data['body-text'] =  str_replace('##Name##', $data['name'], $form->body());
        
        $rules = [
            'name'  => ['required', 'minLength' => 3],
            'email' => ['required', 'email'],
        ];

        $messages = [
            'name'  => 'Please enter a valid name',
            'email' => 'Please enter a valid email address',
        ];

        // some of the data is invalid
        if($invalid = invalid($data, $rules, $messages)) {
            $alert = $invalid;

        // Bestätigungsmail an den Kunden
        } else {
            try {
                $kirby->email([
                    'template' => 'toclient',
                    'from'     => $form->fromemail()->or($site->email())->toString(),
                    'replyTo'  => $form->toemail()->or($site->email())->toString(),
                    'to'       => $data['email'],
                    'subject'  => $form->subject()->or('Thank you for your message'),
                    'data'     => $data
                ]);

            } catch (Exception $error) {
                if(option('debug')) {
                    $alert['error'] = 'The form could not be sent: <strong>' . $error->getMessage() . '</strong>';
                } else {
                    $alert['error'] = 'The form could not be sent!';
                }
            }

            // no exception occurred, let's send a success message
            if (empty($alert) === true) {
                $success = $form->success()->or('Thank you for your message');
            }

            // Benachrichtigungsmail an den Admin
            try {
                $kirby->email([
                    'template' => 'toadmin',
                    'from'     => $form->fromemail()->or($site->email())->toString(),
                    'replyTo'  => $data['email'],
                    'to'       => $form->toemail()->or($site->email())->toString(),
                    'subject'  => $form->adminSubject()->or('Sie haben eine neue Anfrage erhalten'),
                    'data'     => $data
                ]);

            } catch (Exception $error) {
                if(option('debug')) {
                    $alert['error'] = 'The form could not be sent: <strong>' . $error->getMessage() . '</strong>';
                } else {
                    $alert['error'] = 'The form could not be sent!';
                }
            }

        }


    }

    return [
        'alert'   => $alert,
        'data'    => $data ?? false,
        'success' => $success ?? false,
        'form'    => $form ?? false,
    ];
};